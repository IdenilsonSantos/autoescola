import { Knex } from "knex";

import { TableNames } from "../TableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(TableNames.user, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("name").index().notNullable();
      table.string("lastname").index().notNullable();
      table.string("email").unique().notNullable();

      table.comment("Tabela usada para armazenar users do sistema.");
    })
    .then(() => {
      console.log(`# Created table ${TableNames.user}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableNames.user).then(() => {
    console.log(`# Dropped table ${TableNames.user}`);
  });
}
