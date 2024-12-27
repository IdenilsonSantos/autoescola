import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { usersProvider } from "../../database/providers/users";

export const getAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { page = 1, limit = 10, filter = "" } = req.query;
    const result = await usersProvider.getAll(
      Number(page),
      Number(limit),
      String(filter)
    );
    const count: any = await usersProvider.count(String(filter));

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
