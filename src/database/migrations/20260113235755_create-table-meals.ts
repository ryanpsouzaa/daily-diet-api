import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary();
    table
      .uuid('userId')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.text('name').notNullable();
    table.text('description').notNullable();
    table.timestamp('dietDateTime').nullable();
    table.boolean('isOnDiet').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals');
}
