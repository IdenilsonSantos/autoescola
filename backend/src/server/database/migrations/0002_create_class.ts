import { Knex } from "knex";

import { TableNames } from "../TableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(TableNames.class, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("title").unique().index().notNullable();
      table.date("day").index().notNullable();
      table.time("hour").index().notNullable();

      table.comment("Tabela usada para armazenar classes do sistema.");
    })
    .then(() => {
      console.log(`# Created table ${TableNames.class}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableNames.class).then(() => {
    console.log(`# Dropped table ${TableNames.class}`);
  });
}
