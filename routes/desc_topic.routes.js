const { addDesc_topic, getAll, findById, update, remove} = require('../controllers/desc_topic.controller');

const router = require('express').Router();

router.post("/", addDesc_topic)
router.get("/all", getAll)
router.get("/:id", findById)
router.put("/:id", update)
router.delete("/:id", remove)

module.exports = router