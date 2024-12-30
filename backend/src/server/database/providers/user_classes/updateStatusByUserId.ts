import { TableNames } from "../../TableNames";
import { IUserClass } from "../../models";
import { Knex } from "../../knex";

export const updateStatusById = async (
  user_id: number,
  class_id: number,
  status: Omit<IUserClass, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(TableNames.user_classes)
      .update(status)
      .where("user_id", "like", user_id)
      .andWhere("class_id", "like", class_id);

    if (result > 0) return;

    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};
