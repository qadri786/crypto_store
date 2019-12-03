const db = require("../../../../library/db");
const { limit } = require("../../../../config/app").pagination;
const { success, error } = require("../../../messeges")

exports.getCategory = async (req, res, next) => {
    const categories = await db("categories")
    .where({"deleted_at": null})
    .orderBy([{column: "updated_at", order: "desc"}, {column: "created_at", order: "desc"}])
    .select("*")
    .limit(limit).offset(req.offset)
    if(categories){
        res.sendJSON(categories)
    }else{
        res.sendError(null, error("notFound").message)
    }
}

exports.getCategoryById = async (req, res, next) => {
    const category = await db("categories").where({id: req.params.id, deleted_at: null}).first()
    if(category){
        res.sendJSON(category)
    }else{
        res.sendError(null, error("notFound").message)
    }
}

exports.createCategory = async (req, res, next) => {
    try{
        const newCategory = await db("categories").insert(req.body).returning("*")
        res.sendJSON(newCategory[0], success("add", "Category"))
    }catch(err){
        res.sendError(err, error("serverError").message)
    }
}

exports.updateCategory = async (req, res, next) => {
    try{
        const category = await db("categories").where({id: req.params.id, deleted_at: null}).update(req.body).returning("*")
        res.sendJSON(category[0], success("update", "Category"))
    }catch(err){
        res.sendError(err, error("serverError").message)
    }
}

exports.deleteCategory = async (req, res, next) => {
    try{
        const category = await db("categories").where({id: req.params.id, deleted_at: null}).update({deleted_at: db.fn.now()}).returning("*")
        res.sendJSON(category[0], success("update", "Category"))
    }catch(err){
        res.sendError(err, error("serverError").message)
    }
}


exports.uploadAssets = async (req, res, next) => {
    console.log("Start saving")
    try{
        if(req.files){
            if(req.files.image){
               req.body.image = `/category/${req.files["image"][0].filename}`
            }
           if(Object.keys(req.body).length > 0){
               const updateAssets = await db("categories")
               .where("id", req.params.id)
               .update(req.body)
               .returning("*")
               res.sendJSON(updateAssets, success("assets", "Category"));
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