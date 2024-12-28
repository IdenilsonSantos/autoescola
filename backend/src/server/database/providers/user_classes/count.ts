import { TableNames } from "../../TableNames";
import { Knex } from "../../knex";

export const count = async (filter = 0): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(TableNames.user_classes)
      .where("status", "like", `%${filter}%`) // Corrigido o operador para LIKE
      .count<[{ count: number }]>("* as count");

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error("Erro ao consultar a quantidade total de registros");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao consultar a quantidade total de registros");
  }
};
