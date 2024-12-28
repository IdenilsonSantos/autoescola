import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { classesProvider } from "../../database/providers/classes";

export const deleteById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.',
      },
    });
  }

  try {
    const result = await classesProvider.deleteById(+id);

    if (result instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: result.message,
        },
      });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    console.error("Erro ao tentar deletar a pessoa:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Erro inesperado ao tentar deletar a pessoa.",
      },
    });
  }
};
