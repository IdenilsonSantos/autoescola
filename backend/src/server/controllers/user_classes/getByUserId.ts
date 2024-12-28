import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userClassesProvider } from '../../database/providers/user_classes';

export const getByUserId = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.',
      },
    });
  }

  try {
    const result = await userClassesProvider.getByUserId(+id);

    if (result instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: result.message,
        },
      });
    }

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default: 'Aulas não encontradas.',
        },
      });
    }

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error("Erro ao tentar buscar as aulas do usuário:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Erro inesperado ao tentar buscar as aulas da pessoa.",
      },
    });
  }
};
