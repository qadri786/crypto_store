const express = require("express")
const controller = require("./controller")
const router = express.Router()
router.get("/", controller.getHome)
router.get("/:id", controller.getHomeById)

module.exports = router;