import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { userClassesProvider } from "../../database/providers/user_classes";

export const createMany = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = req.body;

    console.log(req.body)

    if (!users) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: "Os campos 'users' e 'class_id' são obrigatórios.",
        },
      });
    }

    const results = await Promise.all(
      users.map(async (user_id: number, class_id: number) => {
        try {
          return await userClassesProvider.create({ user_id, class_id });
        } catch (error) {
          console.error(`Erro ao criar registro para user_id ${user_id}:`, error);
          return new Error(`Erro ao criar registro para o usuário: ${user_id}`);
        }
      })
    );

    const errors = results.filter((result) => result instanceof Error) as Error[];
    const createdIds = results.filter((result) => !(result instanceof Error));

    if (errors.length > 0) {
      return res.status(StatusCodes.PARTIAL_CONTENT).json({
        message: "Alguns registros não foram criados com sucesso.",
        created: createdIds,
        errors: errors.map((error) => error.message),
      });
    }

    return res.status(StatusCodes.CREATED).json({ created: createdIds });
  } catch (error) {
    console.error("Erro inesperado ao criar registros:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Erro inesperado ao tentar criar os registros.",
      },
    });
  }
};
