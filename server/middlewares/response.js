const logCat = require("../../library/logger")("app");
module.exports = function (req, res, next) {
    req.offset = req.query.offset ? req.query.offset: 0;
    
    res.sendJSON = (data, msg = null) => {
        let resObj = {status: true, message: msg, error: null};
        if (typeof data == "object") {
            resObj.data = data;
        } else {
            resObj.data = {app_code: data};
        }
        res.json(resObj);
    }

    res.sendError = (error_obj, msg = null, status = 200) => {
        logCat(error_obj)
        res.status(status).json({status: false, message: msg, data: null, error: error_obj});
    }
    next();
}