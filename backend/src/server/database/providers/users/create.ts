import { TableNames } from "../../TableNames";
import { IUser } from "../../models";
import { Knex } from "../../knex";

export const create = async (
  pessoa: Omit<IUser, "id">
): Promise<number | Error> => {
  try {
    const [result] = await Knex(TableNames.user)
      .insert(pessoa)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao cadastrar o registro");
  } catch (error: any) {
    console.log("Erro ao cadastrar pessoa:", error);
    
    if (error.code === "23505" && error.detail?.includes("email")) {
      return new Error("O email informado já está em uso.");
    }

    if (error.code === "ER_DUP_ENTRY") {
      return new Error("O email informado já está em uso.");
    }

    if (error.message?.includes("UNIQUE constraint failed")) {
      return new Error("O email informado já está em uso.");
    }

    return new Error("Erro ao cadastrar o registro");
  }
};
