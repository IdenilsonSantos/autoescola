import * as deleteById from "./deleteById";
import * as getById from "./getByIds";
import * as create from "./create";
import * as getAll from "./getAll";
import * as count from "./count";
import * as updateById from "./updateById";

export const usersProvider = {
  ...deleteById,
  ...getById,
  ...create,
  ...getAll,
  ...count,
  ...updateById
};
