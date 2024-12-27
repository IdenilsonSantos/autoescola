import { TableNames } from "../../TableNames";
import { IClass } from "../../models";
import { Knex } from "../../knex";

export const create = async (
  lecture: Omit<IClass, "id">
): Promise<number | Error> => {
  try {
    const [result] = await Knex(TableNames.class)
      .insert(lecture)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao cadastrar o registro");
  } catch (error: any) {
    console.log("Erro ao cadastrar aula:", error);
    
    if (error.code === "23505" && error.detail?.includes("title")) {
      return new Error("Há uma aula já cadastrada com este titulo.");
    }

    if (error.code === "ER_DUP_ENTRY") {
      return new Error("Há uma aula já cadastrada com este titulo.");
    }

    if (error.message?.includes("UNIQUE constraint failed")) {
      return new Error("Há uma aula já cadastrada com este titulo.");
    }

    return new Error("Erro ao cadastrar o registro");
  }
};
