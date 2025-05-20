const {
    addTopic,
    getAll,
    getById,
    update,
    remove
} = require("../controllers/topic.controller");
const authorJwtGuard = require('../middleware/guards/author-jwt.guard');



const router = require('express').Router();

router.post("/", addTopic)
router.get("/all", authorJwtGuard, getAll)
router.get("/:id", getById)
router.put("/:id", update)
router.delete("/:id", remove)

module.exports = router