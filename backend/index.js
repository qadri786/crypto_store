// Extend express for making api's routes 
const express = require("express");
const consola = require('consola')
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const router = require("./router")
const app = express();
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
app.set('port', port)
mongoose.connect("mongodb://mongo-dev:27017/tss").catch(err => console.error(err));
// mongoose.connect("mongodb://165.227.49.206:27017/tss").catch(err => console.error(err));
// app.use(session({secret: "keyboard cat milk eyes"}))
// Each request must have json format data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/api", router);

async function start() {
    // Listen the server
    app.listen(port, host)
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  }
  start()
