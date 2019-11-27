const fs = require("fs")
const express = require("express");
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require("cors");
const { middlewares } = require("../config/app");
const logCat = require("../library/logger")("app");
const app = express();

// calling middleware
middlewares.forEach((middleware) => {
    if(middleware.pos === "before"){
        app.use(require(middleware.url))
    }
})

app.use(cors());
//request body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
// Use the logger
app.use(logger('dev'));
app.get("/", async (req, res) => {
    fs.readFile("./package.json",(err, data) => {
        if(!err){
            res.json({"env": process.env.NODE_ENV, "ver" : JSON.parse(data.toString()).version});
        }else{
            res.send(err);
        }
    })
});

fs.readdirSync('./server/routes/').forEach((file) => {
    if(fs.statSync(`./server/routes/${file}`).isDirectory()){
        logCat(`adding route ${__dirname}/${file}`);   
        app.use(`/${file}`, require(`./routes/${file}/routes.js`));
    }
});

// calling middleware
middlewares.forEach((middleware) => {
    if(middleware.pos === "after"){
        app.use(require(middleware.url))
    }
})

module.exports = app;