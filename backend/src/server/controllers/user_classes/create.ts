import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { userClassesProvider } from "../../database/providers/user_classes";

export const create = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { user_id, class_id} = req.body;

    if (!user_id || !class_id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: "Todos os campos obrigatórios devem ser preenchidos.",
        },
      });
    }

    const result = await userClassesProvider.create(req.body);

    if (result instanceof Error) {
      const isTitleDuplicateError = result.message === "Registro com o mesmo usuario e aula já existem.";
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
