
exports.up = function(knex) {
  return knex.schema.createTable("users", function(table){
    table.increments()
    table.string("name")
    table.string("email")
    table.string("mobile")
    table.string("password")
    table.text("address")
    table.string("uid")
    table.text("image").defaultTo("")
    table.boolean("is_active").defaultTo(true)
    table.timestamps(true,true)
    table.timestamp("deleted_at")
  }).createTable("user_roles", function(table){
    table.increments()
    table.string("name")
    table.boolean("is_active").defaultTo(true)
    table.timestamps(true,true)
    table.timestamp("deleted_at")
  }).createTable("user_user_roles", function(table){
      table.integer("user_id").references("users.id")
      table.integer("role_id").references("user_roles.id")
  });    
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("user_user_roles")
    .dropTable("user_roles")
    .dropTable("users")
};
