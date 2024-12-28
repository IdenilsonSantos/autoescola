import { TableNames } from '../../TableNames';
import { IUserClass } from '../../models';
import { Knex } from '../../knex'

export const getByUserId = async (id: number): Promise<IUserClass | any[] | Error> => {
  try {
    const result = await Knex(TableNames.user_classes)
      .select('*')
      .where('user_id', '=', id)

    if (result) return result;

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};