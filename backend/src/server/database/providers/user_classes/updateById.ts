import { TableNames } from "../../TableNames";
import { IClass } from "../../models";
import { Knex } from "../../knex";

export const updateById = async (
  id: number,
  lecture: Omit<IClass, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(TableNames.class)
      .update(lecture)
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};
