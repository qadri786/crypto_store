const express = require("express")
const controller = require("./controller")
const router = express.Router()

router.get("/", controller.getCategory)
router.get("/:id", controller.getCategoryById)
router.post("/", controller.createCategory)
router.put("/:id", controller.updateCategory)
router.delete("/:id", controller.deleteCategory)

module.exports = router;