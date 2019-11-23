
exports.up = function(knex) {
  return knex.schema.createTable("orders", function(table){
    table.increments()
    table.integer("user_id").references("users.id")
    table.string("order_number")
    table.string("invoice_number")
    table.integer("status")
    table.text("address")
    table.timestamps(true, true);
    table.timestamp("deleted_at")
  }).createTable("order_products", function(table){
    table.integer("order_id").references("orders.id")
    table.integer("product_id").references("products.id")
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable("order_products")
  .dropTable("orders")
};
