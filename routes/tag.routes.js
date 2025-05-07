const { addTag, getAll, findById, update, remove} = require('../controllers/tag.controller');

const router = require('express').Router();

router.post("/", addTag)
router.get("/all", getAll)
router.get("/:id", findById)
router.put("/:id", update)
router.delete("/:id", remove)

module.exports = router