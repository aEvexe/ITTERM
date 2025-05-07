const router = require('express').Router();
const dictRouter = require("./dict.routes")
const categoryRouter = require("./category.routes")
const descRouter = require("./description.routes")
const socialRouter = require("./social.routes")
const synonymRouter = require("./synonym.routes")
const authorRouter = require("./author.routes")
const topicRouter = require("./topic.routes")
const tagRouter = require("./tag.routes")
const desc_topicRouter = require("./desc_topic.routes")

router.use("/dict", dictRouter)
router.use("/category", categoryRouter)
router.use("/desc", descRouter)
router.use("/social", socialRouter)
router.use("/synonym", synonymRouter)
router.use("/authors", authorRouter)
router.use("/topic", topicRouter)
router.use("/desc_topic", desc_topicRouter)
router.use("/tag", tagRouter)

module.exports = router