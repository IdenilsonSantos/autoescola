import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { classesProvider } from "../../database/providers/classes";

export const create = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, hour, day } = req.body;

    if (!title || !hour || !day) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: "Todos os campos obrigatórios devem ser preenchidos.",
        },
      });
    }

    const result = await classesProvider.create(req.body);

    if (result instanceof Error) {
      const isTitleDuplicateError = result.message === "Há uma aula já cadastrada com este titulo.";
      const statusCode = isTitleDuplicateError
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
    console.error("Erro ao criar aula:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Erro inesperado ao tentar criar a aula.",
      },
    });
  }
};
