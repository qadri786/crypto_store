const db = require("../../library/db");


exports.attachCategoriesProduct = async (product) => {
    const categories = await db("product_categories")
    .innerJoin("categories", "product_categories.category_id", "categories.id")
    .where({"product_categories.product_id": product.id})
    .select(["categories.id", "categories.name"])
    product["categories"] = categories
    return product
}

exports.attachOutletsProduct = async (product) => {
    const outlets = await db("outlet_products")
    .innerJoin("outlets", "outlet_products.outlet_id", "outlets.id")
    .where({"outlet_products.product_id": product.id})
    .select(["outlets.id", "outlets.name"])
    product["outlets"] = outlets
    return product
}