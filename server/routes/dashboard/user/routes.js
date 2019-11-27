const express = require("express");
const controller = require("./controller");
const validation = require("./validation");

const router = express.Router();
router.get("/", controller.user.getUser);
router.get("/:id", controller.user.getUserId);
router.post("/", validation.fields, validation.validate, controller.user.createUser);
router.put("/:id", controller.user.updateUser);
router.delete("/:id", controller.user.deleteUser);
router.post("/login", validation.login, validation.validate, controller.user.loginUser);
module.exports = router