import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { usersProvider } from "../../database/providers/users";

export const updateById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: { default: 'O parâmetro "id" precisa ser informado.' },
      });
    }

    const result = await usersProvider.updateById(+id, req.body);

    if (result instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: { default: result.message },
      });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: 'Erro inesperado ao tentar atualizar o registro.' },
    });
  }
};
