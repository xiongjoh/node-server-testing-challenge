
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
      table.increments()
      table.string('name', 128).unique().notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
