const {
    addTopic,
    getAll,
    getById,
    update,
    remove
} = require("../controllers/topic.controller")

const router = require('express').Router();

router.post("/", addTopic)
router.get("/all", getAll)
router.get("/:id", getById)
router.put("/:id", update)
router.delete("/:id", remove)

module.exports = router