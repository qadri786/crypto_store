const express = require("express")
const { upload } = require("../../../../library/storage")
const controller = require("./controller")
const router = express()
router.get("/", controller.getProduct)
router.get("/:id", controller.getProductById)
router.post("/", controller.createProduct)
router.post("/upload/:id", upload({folder: "outlets"}).fields([{name: "image", maxCount: 99}]),controller.uploadAssets)
router.put("/:id", controller.updateProduct)
router.delete("/:id", controller.deleteProduct)

module.exports = router;