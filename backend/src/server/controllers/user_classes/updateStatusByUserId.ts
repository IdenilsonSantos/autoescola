import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userClassesProvider } from "../../database/providers/user_classes";

export const updateStatusByUserId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { user_id, class_id } = req.params;

    if (!user_id || !class_id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: 'O parâmetro "user_id" e "class_id" precisa ser informado.',
        },
      });
    }

    const result = await userClassesProvider.updateStatusById(
      +user_id,
      +class_id,
      req.body
    );

    console.log(req.body, req.params)

    if (result instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: { default: result.message },
      });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: "Erro inesperado ao tentar atualizar o registro." },
    });
  }
};
