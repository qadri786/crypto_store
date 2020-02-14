const db = require("../../../../library/db")
const {limit} = require("../../../../config/app").pagination
const { error, success } = require("../../../messeges")

exports.getOutlets = async (req, res, next) => {
    const outlets = await db("outlets")
    .innerJoin("user_outlets", "outlets.id", "user_outlets.outlet_id")
    .innerJoin("users", "user_outlets.user_id", "users.id")
    .where({"outlets.deleted_at": null, "users.id": req.user.id})
    .select(["outlets.*"])
    .limit(limit).offset(req.offset)
    if(outlets){
        res.sendJSON(outlets)
    }else{
        res.sendError(null, error("notFound").message)
    }
}

exports.getOutletsById = async (req, res, next) => {
    const {id} = req.params;
    const outlet = await db("outlets")
    .innerJoin("user_outlets", "outlets.id", "user_outlets.outlet_id")
    .innerJoin("users", "user_outlets.user_id", "users.id")
    .where({"outlets.deleted_at": null, "users.id": req.user.id, "outlets.id": id})
    .select(["outlets.*"]).first()
    if(outlet){
        res.sendJSON(outlet)
    }else{
        res.sendError(null, error("notFound").message)
    }
}

exports.createOutlet = async (req, res, next) => {
    try{
        const newOutlet = await db("outlets").insert(req.body).returning("*")
        await db("user_outlets").insert({"user_id": req.user.id, "outlet_id": newOutlet[0].id})        
        res.sendJSON({"outlet": newOutlet[0]}, success("add", "Outlet"))
    }catch(err){
        res.sendError(err, error("serverError").message)
    }
}

exports.updateOutlet = async (req, res, next) => {
    try{
        const {id} = req.params;
        const outlet = await db("outlets").where({id}).update(req.body).returning("*")
        res.sendJSON(outlet,success("edit", "Outlet")) 
    }catch(err){
        res.sendError(err, error("serverError").message)
    }
}

exports.deleteOutlet = async (req, res, next) => {
    try{
        const {id} = req.params;
        const outlet = await db("outlets").where({id}).update({"deleted_at": db.fn.now()}).returning("*")
        res.sendJSON(outlet, success("remove", "Outlet")) 
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
                    return `/outlets/${file.filename}`
                }));
            }
           if(Object.keys(req.body).length > 0){
               const updateAssets = await db("outlets")
               .where("id", req.params.id)
               .update(req.body)
               .returning("*")
               res.sendJSON(updateAssets, success("assets", "Outlet"));
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