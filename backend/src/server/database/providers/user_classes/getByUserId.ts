import { TableNames } from '../../TableNames';
import { IUserClass } from '../../models';
import { Knex } from '../../knex';

export const getByUserId = async (id: number): Promise<IUserClass | any[] | Error> => {
  try {
    const result = await Knex(TableNames.user_classes)
      .select(
        `${TableNames.user_classes}.*`,
        `${TableNames.class}.title as class_name`,
        `${TableNames.class}.hour as class_hour`,
        `${TableNames.class}.day as class_day`,
        `${TableNames.user}.name as user_name`,
        `${TableNames.user}.lastname as user_lastname`
      )
      .join(TableNames.class, `${TableNames.user_classes}.class_id`, '=', `${TableNames.class}.id`)
      .join(TableNames.user, `${TableNames.user_classes}.user_id`, '=', `${TableNames.user}.id`)
      .where(`${TableNames.user_classes}.user_id`, '=', id);

    if (result.length > 0) {
      return result;
    }

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};