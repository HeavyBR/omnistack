
exports.up = function(knex) {
    return knex.schema.createTable('TB_INCIDENT', function (table) {
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();

        table.foreign('ong_id').references('id').inTable('TB_ONG');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('TB_INCIDENT')
};
