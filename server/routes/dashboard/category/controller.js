const db = require("../../../../library/db");
const { error } = require("../../../messeges")
exports.getCategory = async (req, res, next) => {
    const categories = await db("categories")
    .where({"deleted_at": null}).select("*")
    if(categories){
        res.sendJSON(categories)
    }else{
        res.sendError(null,error("notFound").message)
    }
}