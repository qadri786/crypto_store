const db = require("../../../../library/db")
const {limit} = require("../../../../config/app").pagination
const { error, success } = require("../../../messeges")
const { removeFromObject } = require("../../../../library/objectFilter")
const { attachCategoriesProduct, attachOutletsProduct } = require("../../../constants/query")

exports.getProduct = async (req, res, next) => {
    let products = await db("products")
    .innerJoin("product_users", "products.id", "product_users.product_id")
    .innerJoin("users", "product_users.user_id", "users.id")
    .where({"products.deleted_at": null, "users.id": req.user.id})
    .select(["products.*"])
    .limit(limit).offset(req.offset)
    if(products){
        products = await Promise.all(products.map(async (product) => {
            product = attachCategoriesProduct(product)
            product = attachOutletsProduct(product)
            return product
        }))
        res.sendJSON(products)
    }else{
        res.sendError(null, error("notFound").message)
    }
}

exports.getProductById = async (req, res, next) => {
    const {id} = req.params;
    let product = await db("products")
    .innerJoin("product_users", "products.id", "product_users.product_id")
    .innerJoin("users", "product_users.user_id", "users.id")
    .where({"products.deleted_at": null, "users.id": req.user.id, "products.id": id})
    .select(["products.*"]).first()
    if(product){
        product = attachCategoriesProduct(product)
        product = attachOutletsProduct(product)
        res.sendJSON(product)
    }else{
        res.sendError(null, error("notFound").message)
    }
}

exports.createProduct = async (req, res, next) => {
    try{
        const newProduct = await db("products").insert(removeFromObject(req.body, ["category_id", "outlet_id"])[0]).returning("*")
        await db("product_users").insert({user_id: req.user.id, product_id: newProduct[0].id}).returning("*")
        if(req.body.hasOwnProperty("category_id")){
            const categories = category_id.map((item) => { return {category_id: item, product_id: newProduct[0].id} })
            await db("product_categories").insert(categories).returning("*")
        }
        if(req.body.hasOwnProperty("outlet_id")){
            const outlets = outlet_id.map((item) => { return {outlet_id: item, product_id: newProduct[0].id} })
            await db("outlet_products").insert(outlets).returning("*")
        }
        res.sendJSON({"product": newProduct[0]}, success("add", "Product"))
    }catch(err){
        res.sendError(err, error("serverError").message)
    }
}

exports.updateProduct = async (req, res, next) => {
    try{
        const {id} = req.params;
        const product = await db("products").where({id}).update(removeFromObject(req.body, ["category_id", "outlet_id"])[0]).returning("*")
        if(req.body.hasOwnProperty("category_id")){
            const categories = category_id.map((item) => { return {category_id: item, product_id: product[0].id} })
            await db("product_categories").where({product_id: product[0].id}).del()
            await db("product_categories").insert(categories).returning("*")
        }
        if(req.body.hasOwnProperty("outlet_id")){
            const outlets = outlet_id.map((item) => { return {outlet_id: item, product_id: product[0].id} })
            await db("outlet_products").where({product_id: product[0].id}).del()
            await db("outlet_products").insert(outlets).returning("*")
        }
        res.sendJSON(product,success("edit", "Product")) 
    }catch(err){
        res.sendError(err, error("serverError").message)
    }
}

exports.deleteProduct = async (req, res, next) => {
    try{
        const {id} = req.params;
        const outlet = await db("products").where({id}).update({"deleted_at": db.fn.now()}).returning("*")
        res.sendJSON(outlet, success("remove", "Product")) 
    }catch(err){
        res.sendError(err, error("serverError").message)
    }
}

exports.uploadAssets = async (req, res, next) => {
    console.log("Start saving")
    try{
        if(req.files){
            if(req.files.image){
               req.body.image = await Promise.all(req.files.image.map((file) => {
                    return `/products/${file.filename}`
                }));
            }
           if(Object.keys(req.body).length > 0){
               const updateAssets = await db("products").where("id", req.params.id).update(req.body).returning("*")
               res.sendJSON(updateAssets, success("assets", "Product"));
           }else{
               res.sendError(null, error("noAssetsUpload").message)    
           }
       }else{
           res.sendError(null, error("noAssetsUpload").message)
       }
    }catch(err){
        res.sendError(err, error("serverError").message)
    }
}