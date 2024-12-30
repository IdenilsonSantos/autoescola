import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from 'react-router-dom';
import User from "../Pages/CreateUser";

describe("User Screen", () => {
  it("renders the form with inputs and button", () => {
    render(<MemoryRouter><User /></MemoryRouter>);

    expect(screen.getByLabelText("Digite o nome do aluno")).not.toBeNull();
    expect(screen.getByLabelText("Digite o sobrenome do aluno")).not.toBeNull();
    expect(screen.getByLabelText("Digite o email do aluno")).not.toBeNull();

    expect(
      screen.getByRole("button", { name: "Cadastrar Aluno" })
    ).not.toBeNull();
  });

  it("validates empty fields when clicking the button", () => {
    render(<MemoryRouter><User /></MemoryRouter>);

    const button = screen.getByRole("button", { name: "Cadastrar Aluno" });
    fireEvent.click(button);

    expect(screen.getByText("Nome obrigatório")).not.toBeNull();
    expect(screen.getByText("Sobrenome obrigatório")).not.toBeNull();
    expect(screen.getByText("Email obrigatório")).not.toBeNull();
  });

  it("does not show error messages when fields are valid", () => {
    render(<MemoryRouter><User /></MemoryRouter>);

    fireEvent.change(screen.getByLabelText("Digite o nome do aluno"), {
      target: { value: "João" },
    });
    fireEvent.change(screen.getByLabelText("Digite o sobrenome do aluno"), {
      target: { value: "Silva" },
    });
    fireEvent.change(screen.getByLabelText("Digite o email do aluno"), {
      target: { value: "joao@email.com" },
    });

    const button = screen.getByRole("button", { name: "Cadastrar Aluno" });
    fireEvent.click(button);

    expect(screen.queryByText("Nome obrigatório")).toBeNull();
    expect(screen.queryByText("Sobrenome obrigatório")).toBeNull();
    expect(screen.queryByText("Email obrigatório")).toBeNull();
  });
});
