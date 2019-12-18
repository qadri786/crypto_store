const express = require("express")
const controller = require("./controller")
const { upload } = require("../../../../library/storage")
const router = express.Router()

router.get("/", controller.getOutlets)
router.get("/:id", controller.getOutletsById)
router.post("/", controller.createOutlet)
router.post("/upload/:id", upload({folder: "outlets"}).fields([{name: "image", maxCount: 5}]),controller.uploadAssets)
router.put("/:id", controller.updateOutlet)
router.delete("/:id", controller.deleteOutlet)

module.exports = router;