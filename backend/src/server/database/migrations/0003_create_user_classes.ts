import { Knex } from "knex";

import { TableNames } from "../TableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(TableNames.user_classes, (table) => {
      table.bigIncrements("id").primary().index();
      table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE');
      table
      .integer('class_id')
      .unsigned()
      .references('id')
      .inTable('class')
      .onDelete('CASCADE');
      table.boolean('status').defaultTo(false);

      table.comment("Tabela usada para armazenar a relação entre users e classes do sistema.");
    })
    .then(() => {
      console.log(`# Created table ${TableNames.user_classes}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableNames.user_classes).then(() => {
    console.log(`# Dropped table ${TableNames.user_classes}`);
  });
}
