const { verify } = require("../../library/auth");
const appConfig = require("../../config/app");

module.exports = (req, res, next) => {
    const authorization = (req.get('Authorization') || req.headers['Authorization'] || 'undefined').toString();
    if (authorization !== 'undefined') {
        let auth = authorization.toString().split(" ")[1];

        if (auth){
            auth = verify(auth);
            if(auth.aud === appConfig.auth.audience){
                req["user"] = { "id": auth.id, "role": auth.role };
                next()
            }else{
                res.sendError(null, "Your authentication token has been expired !", 401);
                // res.status("401").json({ message: "project dosen't meets" })
            }
        }else{
            next()    
        }
    }else{
        const pattDashboard = new RegExp("dashboard");
        const pattMedia = new RegExp("media");
        if(pattDashboard.exec(req.path) || pattMedia.exec(req.path)){
            if(req.path.indexOf("login") > -1 || req.path.indexOf("api-docs") > -1){
                next()    
            }else{
                // next()
                res.sendError(null, "Un-Authorized user !", 401);
            }
        }else{
            next()
        }
    }
}