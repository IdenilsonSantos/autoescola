import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { usersProvider } from "../../database/providers/users";

export const create = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, name, lastname } = req.body;

    if (!email || !name || !lastname) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: "Todos os campos obrigatórios devem ser preenchidos.",
        },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: "O email fornecido é inválido.",
        },
      });
    }

    const result = await usersProvider.create(req.body);

    if (result instanceof Error) {
      const isEmailDuplicateError = result.message === "O email informado já está em uso.";
      const statusCode = isEmailDuplicateError
        ? StatusCodes.BAD_REQUEST
        : StatusCodes.INTERNAL_SERVER_ERROR;

      return res.status(statusCode).json({
        errors: {
          default: result.message,
        },
      });
    }

    return res.status(StatusCodes.CREATED).json({ id: result });
  } catch (error) {
    console.error("Erro ao criar pessoa:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Erro inesperado ao tentar criar a pessoa.",
      },
    });
  }
};
