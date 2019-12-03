const express = require("express")
const controller = require("./controller")
const { upload } = require("../../../../library/storage")
const router = express.Router()

router.get("/", controller.getCategory)
router.get("/:id", controller.getCategoryById)
router.post("/", controller.createCategory)
router.post("/upload/:id", upload({folder: "category"}).fields([{name: "image", maxCount: 1}]), controller.uploadAssets)
router.put("/:id", controller.updateCategory)
router.delete("/:id", controller.deleteCategory)

module.exports = router;