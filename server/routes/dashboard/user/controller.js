const { success, error } = require('../../../messeges');
const { generateKey } = require("../../../../library/auth");
const { encrypt } = require("../../../../library/encryption")
const { limit } = require("../../../../config/app").pagination
const db = require("../../../../library/db");


exports.user = {
    getUser: async (req, res, next) => {
        let users = await db("users").where({deleted_at: null}).select("*").limit(limit).offset(req.offset)
        if(users.length > 0){
            res.sendJSON({ users });
        }
        res.sendError(error("notFound"));
    },
    
    getUserId: async (req, res, next) => {
        let { id } = req.params;
        let user = await db("users").where({id,deleted_at: null}).select("*").first()
        if(user){
            res.sendJSON({user});
        }
        res.sendError(error("notFound"));
    },

    createUser: async (req, res, next) => {
        try{
            let newUser = await db("users").insert(req.body).returning("*")
            await db("user_user_roles").insert({user_id: newUser[0].id, role_id: 1})
            res.sendJSON({ "user": newUser[0] }, success("add", "User"));
        }catch(err){
            res.sendError(err);
        }
    },

    updateUser: async (req, res, next) => {
        try{
            let user = await db("users").where({id: req.params.id}).update(req.body).returning("*")
            res.sendJSON({ user: user[0] }, success("update", "User"));
        }catch(err){
            res.sendError(err);
        }
    },

    deleteUser: async (req, res, next) => {
        try{
            let user = await db("users").where({id: req.params.id}).update({deleted_at: Date()}).returning("*")
            res.sendJSON({ user: user[0] }, success("remove", "User"));
        }catch(err){
            res.sendError(err);
        }
    },
    
    loginUser: async (req, res, next) => {
        try{
            let user = await db("users")
            .innerJoin("user_user_roles", "users.id", "user_user_roles.user_id")
            .innerJoin("user_roles", "user_user_roles.role_id", "user_roles.id")
            .where({"users.email": req.body.email, "users.password": encrypt(req.body.password), "user_roles.id": 1})
            .where({
                "users.is_active": true, "users.deleted_at": null,
                "user_roles.is_active": true, "user_roles.deleted_at": null
            })
            .select(["users.*", "user_roles.name as role"])
            .first()
            if(user){
                let token = generateKey({ id: user.id, role: user.role });
                res.sendJSON({ token });
            }else{
                res.sendError(null,error("inValidUser").message);    
            }
        }catch(err){
            res.sendError(err, err.message);
        }
    }
}