import * as deleteById from "./deleteById";
import * as getById from "./getByIds";
import * as getByUserId from "./getByUserId";
import * as create from "./create";
import * as getAll from "./getAll";
import * as count from "./count";
import * as updateById from "./updateById";
import * as updateStatusByUserId from "./updateStatusByUserId";

export const userClassesProvider = {
  ...deleteById,
  ...getById,
  ...getByUserId,
  ...create,
  ...getAll,
  ...count,
  ...updateById,
  ...updateStatusByUserId
};
