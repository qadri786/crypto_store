const express = require("express");
const jwt = require("jsonwebtoken");
const views = require("./views");
const utils = require("./utils");
const app = express.Router()
const tokenVerify = (req, res, next) => {
    let token = req.headers["authorization"].split("=")[1]; 
    let fb_user = jwt.decode(token);
    if(fb_user !== null && fb_user.hasOwnProperty("aud")){
        if(fb_user.aud === "thesmartstore-29c86"){
            req.headers.user_id = fb_user.user_id;
            next();
        }else{
            res.status(400).json({"message": "Unauthorized User !"});
        }
    }else{
        res.status(400).json({"message": "Invalid token"});
    }
};


app.post("/user/register", tokenVerify, views.userRegistration);
app.post("/user/register/check", views.userValid);
app.get("/user/company", tokenVerify, views.companyGetByUser);
app.get("/user/check", tokenVerify, views.checkUser);
// Customer views
app.post("/customer/register", tokenVerify, views.customerRegistration);
app.get("/customer", tokenVerify, views.customerById);
// Make an Order
app.post("/customer/order", tokenVerify, views.customerOrder);
// category views
app.get("/category", views.categoryGet);
// Product views
app.get("/product", views.productGet);
app.get("/product/:id", views.productGetOne);
app.get("/productGrid", tokenVerify, views.productUser);
app.get("/product/category/:category", views.categoryProduct);
app.post("/product", tokenVerify, views.productCreate);
app.put("/product/:id",tokenVerify, views.productModify);
app.delete("/product/:id",tokenVerify, views.productDelete);
app.post("/product/import/save",tokenVerify, views.importProducts);
app.post("/product/import",tokenVerify, views.uploadProducts);
// Company views
app.get("/company", views.companyGet);
app.get("/company/:id", views.companyGetOne);
app.post("/company", tokenVerify, views.companyCreate);
// Except this one because file can't be upload in json format !
app.post("/product/upload/:id", tokenVerify, utils.upload.array("image", 50), views.productUpload);
// Dashboard Views
app.get("/dashboard/order-tracking", tokenVerify, views.orderTracking);

module.exports = app