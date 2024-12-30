import * as create from "./create";
import * as createMany from "./createMany";
import * as deleteById from "./deleteById";
import * as getById from "./getById";
import * as getByUserId from "./getByUserId"
import * as getAll from "./getAll";
import * as updateById from "./updateById";
import * as updateStatusByUserId from "./updateStatusByUserId";

export const UserClassesController = {
  ...create,
  ...createMany,
  ...deleteById,
  ...getById,
  ...getByUserId,
  ...getAll,
  ...updateById,
  ...updateStatusByUserId 
};
