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
        next()
        // Should change to regex !
        // let exempt = appConfig.auth.exempt.filter((item) => { return item == req.path });
        // if(exempt.length > 0){
        //     next();
        // }else{
        //     res.sendError({ error: "authentication value mismatched" });
        //     // res.status("401").json({ message: "authentication value mismatched" });
        // }
    }
}