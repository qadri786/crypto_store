const express = require("express");
const controller = require("./controller");
router = express.Router();

router.get("/", controller.getOrder)

module.exports = router;