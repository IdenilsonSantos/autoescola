import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userClassesProvider  } from "../../database/providers/user_classes";

export const getAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { page = 1, limit = 10, filter = 0 } = req.query;
    const result = await userClassesProvider.getAll(
      Number(page),
      Number(limit),
      Number(filter)
    );
    const count: any = await userClassesProvider.count(Number(filter));

    if (result instanceof Error || count instanceof Error) {
      const errorMessage =
        result instanceof Error ? result.message : count.message;
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: { default: errorMessage },
      });
    }

    res.setHeader("access-control-expose-headers", "x-total-count");
    res.setHeader("x-total-count", count);

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: "Erro inesperado ao tentar recuperar os dados." },
    });
  }
};
