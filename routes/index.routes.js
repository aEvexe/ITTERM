const router = require('express').Router();
const dictRouter = require("./dict.routes")
const categoryRouter = require("./category.routes")
const descRouter = require("./description.routes")
const socialRouter = require("./social.routes")
const synonymRouter = require("./synonym.routes")

router.use("/dict", dictRouter)
router.use("/category", categoryRouter)
router.use("/desc", descRouter)
router.use("/social", socialRouter)
router.use("/synonym", synonymRouter)

module.exports = router