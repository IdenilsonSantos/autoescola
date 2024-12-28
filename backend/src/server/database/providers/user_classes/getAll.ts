import { TableNames } from '../../TableNames';
import { IClass } from '../../models';
import { Knex } from '../../knex';


export const getAll = async (page: number, limit: number, filter: number): Promise<IClass[] | Error> => {
  try {
    const result = await Knex(TableNames.user_classes)
      .select('*')
      .where('status', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};