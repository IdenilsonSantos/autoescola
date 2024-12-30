import { TableNames } from "../../TableNames";
import { IUserClass } from "../../models";
import { Knex } from "../../knex";

export const create = async (
  relations:
    | Omit<IUserClass, "id">
    | {
        user_id: number | { user_id: number; class_id: number };
        class_id?: number;
      }
): Promise<number | Error> => {
  try {
    let user_id: number;
    let class_id: number;

    if (typeof relations.user_id === "object") {
      user_id = relations.user_id.user_id;
      class_id = relations.user_id.class_id;
    } else {
      user_id = relations.user_id as number;
      class_id = relations.class_id as number;
    }

    if (!user_id || !class_id) {
      return new Error("Os campos 'user_id' e 'class_id' são obrigatórios.");
    }

    const exists = await Knex(TableNames.user_classes)
      .where("user_id", user_id)
      .andWhere("class_id", class_id)
      .first();

    if (exists) {
      return new Error("Registro com o mesmo usuário e aula já existe.");
    }

    const insertData = {
      user_id,
      class_id,
    };

    const [result] = await Knex(TableNames.user_classes)
      .insert(insertData)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao cadastrar o registro.");
  } catch (error: any) {
    console.error("Erro ao cadastrar registro:", error);

    return new Error("Erro ao cadastrar o registro.");
  }
};
