
exports.up = function(knex) {
  return knex.schema.createTable("outlets", function(table){
    table.increments()
    table.string("name").unique()
    table.string("slug")
    table.jsonb("image")
    table.float("lat")
    table.float("lng")
    table.string("phone")
    table.string("email")
    table.jsonb("social")
    table.boolean("is_active").defaultTo(true)
    table.timestamps(true, true)
    table.timestamp("deleted_at")
  }).createTable("user_outlets", function(table){
    table.integer("user_id").references("users.id")
    table.integer("outlet_id").references("outlets.id")
  }).createTable("outlet_products", function(){
    table.integer("user_id").references("users.id")
    table.integer("product_id").references("products.id")
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable("user_outlets")
  .dropTable("outlet_products")
  .dropTable("outlets")
  
};
