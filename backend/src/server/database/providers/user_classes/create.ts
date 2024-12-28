import { TableNames } from "../../TableNames";
import { IUserClass } from "../../models";
import { Knex } from "../../knex";

export const create = async (
  relations: Omit<IUserClass, "id">
): Promise<number | Error> => {
  try {

    const exists = await Knex(TableNames.user_classes)
      .where("user_id", relations.user_id)
      .andWhere("class_id", relations.class_id)
      .first();

    if (exists) {
      return new Error("Registro com o mesmo usuario e aula já existem.");
    }

    const [result] = await Knex(TableNames.user_classes)
      .insert(relations)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao cadastrar o registro");
  } catch (error: any) {
    console.log("Erro ao cadastrar aula:", error);

    return new Error("Erro ao cadastrar o registro");
  }
};
