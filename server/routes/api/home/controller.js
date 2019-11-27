const db = require("../../../../library/db");
const { limit } = require("../../../../config/app").pagination
const { error } = require("../../../messeges")

exports.getHome = async (req, res, next) => {
    res.sendJSON([
        {id: "1", name: "Categories", "image": "https://placehold.it/200x150/red?text=Categories"},
        {id: "2", name: "Top rated", "image": "https://placehold.it/200x150/green?text=Top rated"},
        {id: "3", name: "Recently added products", "image": "https://placehold.it/200x150/blue?text=Recently added products"},
        {id: "4", name: "Best sellers", "image": "https://placehold.it/200x150/yellow?text=Best sellers"},
    ])
}

exports.getHomeById = async (req, res, next) => {
    try{
        switch(req.params.id){
            case "1":
                res.sendJSON(await getCategories())
                return
            case "2":
                res.sendJSON(await getProducts(req,[{column: "rate", order: "desc"}]))
                return 
            case "3":
                res.sendJSON(await getProducts(req,[{column: "created_at", order: "desc"}]))
                return
            case "4":
                res.sendJSON(await getOutlets(req, [{column: "rate", order: "desc"}]))
                return
            default:
                res.sendError(null, error("yetNotImpl").message)
                return
        }
    }catch(err){
        res.sendError(err, error("serverError").message)
    }
}

const getCategories = async () => {
    const categories = await db("categories")
    .where({"is_active": true, "deleted_at": null})
    .select("*")
    return categories;
}

const getProducts = async (req, order = [{column: "id", order: "asc"}], where = {}) => {
    const products = await db("products")
    .innerJoin("product_categories", "product_categories.product_id", "products.id")
    .innerJoin("categories", "product_categories.category_id", "categories.id")
    .where({
        "products.is_active": true, "products.deleted_at": null,
        "categories.is_active": true, "categories.deleted_at": null,
    }).where(where).orderBy(order)
    .select(["products.*", "categories.id as category_id", "categories.name as category_name"])
    .limit(limit).offset(req.offset)
    return products; 
}   

const getOutlets = async (req, order=[{column: "id", order: "asc"}], where= {}) => {
    const outlets = await db("outlets")
    .where(where)
    .where({"outlets.is_active": true, "outlets.deleted_at": null})
    .orderBy(order)
    .select("*")
    .limit(limit).offset(req.offset)
    return outlets;
}