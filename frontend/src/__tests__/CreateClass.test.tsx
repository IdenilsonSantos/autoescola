import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Class from '../Pages/CreateClass';
import fetchData from '../utils/fetch';

// Mock do fetchData
vi.mock('../utils/fetch');

// Mock do useNavigate
vi.mock('react-router-dom', async () => ({
  ...await vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}));

describe('Class component', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <Class />
      </MemoryRouter>
    );

    // Verifica se os campos estão renderizados
    expect(screen.getByLabelText('Digite o titulo da aula')).toBeInTheDocument();
    expect(screen.getByLabelText('Digite o dia da aula')).toBeInTheDocument();
    expect(screen.getByLabelText('Digite o horário da aula')).toBeInTheDocument();
    expect(screen.getByText('Cadastrar aula')).toBeInTheDocument();
  });

  it('shows error messages when fields are empty and user tries to submit', async () => {
    render(
      <MemoryRouter>
        <Class />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Cadastrar aula'));

    await waitFor(() => {
      expect(screen.getByText('Nome obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Sobrenome obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Horário obrigatório')).toBeInTheDocument();
    });
  });
  
  it('does not navigate if there are validation errors', async () => {
    const navigateMock = vi.fn();
    (vi.mocked(useNavigate).mockReturnValue(navigateMock)); // Configura o mock de navigate

    render(
      <MemoryRouter>
        <Class />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Cadastrar aula'));

    await waitFor(() => {
      expect(navigateMock).not.toHaveBeenCalled();
    });
  });
});
