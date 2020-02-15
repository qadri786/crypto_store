const db = require("../../../../library/db");
const { limit } = require("../../../../config/app").pagination
const { error, success } = require("../../../messeges")
const { removeFromObject } = require("../../../../library/objectFilter")


exports.getOrder = async (req, res, next) => {
    const orders = await db("orders")
    .where({"orders.deleted_at": null, "user_id": req.user.id})
    .select(["orders.*"])
    .limit(limit).offset(req.offset)
    if(orders.length > 0){
        res.sendJSON(orders)
    }else{
        res.sendError([], error("notFound").message)
    }    
}

exports.getOrderById = async (req, res, next) => {
    const {id} = req.params;
    const order = await db("orders")
    .innerJoin("order_products", "orders.id", "order_products.order_id")
    .innerJoin("products", "order_products.product_id", "products.id")
    .innerJoin("outlets", "order_products.outlet_id", "outlets.id")
    .where({
        "products.deleted_at": null, "products.is_active": true,
        "outlets.deleted_at": null, "outlets.is_active": true
    })
    .where({"orders.deleted_at": null, "orders.user_id": req.user.id, "orders.id": id})
    .select(["orders.*"]).first()
    if(order > 0){
        res.sendJSON(order)
    }else{
        res.sendError([], error("notFound").message)
    }
}

exports.createOrder = async (req, res, next) => {
    try{
        const newOrder = await db("orders").insert(removeFromObject(req.body, ["items"])).returning("*")
        if(req.body.hasOwnProperty("items")){
            const items = req.body.items.map((item) => {
                return {
                    "order_id": newOrder[0].id,
                    "product_id": item.product_id,
                    "outlets": item.outlet_id
                }
            });
            await db("order_products").insert(items).returning("*");
        }
        // add sendmail function;
        res.sendJSON(null, success("add", "Order"));
    }catch(err){
        res.sendError(err, error("serverError").message);
    }
}


exports.updateOrder = async (req, res, next) => {
    try{
        const { id } = req.params;
        const newOrder = await db("orders").where({"orders.id": id}).update(removeFromObject(req.body, ["items"])).returning("*")
        if(req.body.hasOwnProperty("items")){
            await db("order_products").where({"order_id": id}).del();
            const items = req.body.items.map((item) => {
                return {
                    "order_id": newOrder[0].id,
                    "product_id": item.product_id,
                    "outlet_id": item.outlet_id
                }
            });
            await db("order_products").insert(items).returning("*");
        }
        // add sendmail function;
        res.sendJSON(null, success("edit", "Order"));
    }catch(err){
        res.sendError(err, error("serverError").message);
    }
}

exports.deleteOrder = async (req, res, next) => {
    try{
        const { id } = req.params;
        await db("orders").where({"orders.id": id}).update({"orders.deleted_at": db.fn.now()});
        res.sendJSON(null, success("remove", "Order"));
    }catch(err){
        res.sendError(err, error("serverError").message);
    }
}