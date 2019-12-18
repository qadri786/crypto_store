
exports.up = function(knex) {
  return knex.schema
  .createTable("categories", function(table){
    table.increments()
    table.string("name")
    table.string("slug")
    table.string("color")
    table.text("image")
    table.integer("parent_id").references("categories.id")
    table.boolean("is_active").defaultTo(true)
    table.timestamps(true,true)
    table.timestamp("deleted_at")
  }).createTable("products", function(table){
    table.increments()
    table.string("name")
    table.string("slug")
    table.string("sku")
    table.float("price").defaultTo(0)
    table.float("discount").defaultTo(0)
    table.integer("stock").defaultTo(0)
    table.string("short_description")
    table.string("description")
    table.jsonb("image")
    table.integer("rate").defaultTo(0)
    table.boolean("is_single").defaultTo(false)
    table.boolean("is_virtual").defaultTo(false)
    table.boolean("is_active").defaultTo(true)
    table.timestamps(true,true)
    table.timestamp("deleted_at")
  }).createTable("product_categories", function(table){
    table.integer("category_id").references("categories.id")
    table.integer("product_id").references("products.id")
  }).createTable("product_attributes", function(table){
    table.integer("product_id").references("products.id")
    table.jsonb("key_value")
  }).createTable("product_users", function(table) {
    table.integer("user_id").references("users.id")
    table.integer("product_id").references("products.id")
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable("product_users")
  .dropTable("product_attributes")
  .dropTable("product_categories")
  .dropTable("products")
  .dropTable("categories")
};
