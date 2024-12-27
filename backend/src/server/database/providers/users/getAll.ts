import { TableNames } from '../../TableNames';
import { IUser } from '../../models';
import { Knex } from '../../knex';


export const getAll = async (page: number, limit: number, filter: string): Promise<IUser[] | Error> => {
  try {
    const result = await Knex(TableNames.user)
      .select('*')
      .where('name', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};