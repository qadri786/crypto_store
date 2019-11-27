module.exports = async (req, res, next) =>{
    res.sendError(null, "Route not found")
}