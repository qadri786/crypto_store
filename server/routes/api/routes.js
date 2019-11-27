const fs = require("fs");
const logCat = require("../../../library/logger")("app")
const express = require("express");

const router = express.Router();

fs.readdirSync(__dirname).forEach((file) => {
    if(fs.statSync(`${__dirname}/${file}`).isDirectory()){
        logCat(`adding route ${__dirname}/${file}`);   
        router.use(`/${file}`, require(`./${file}/routes.js`));
    }
});

module.exports = router