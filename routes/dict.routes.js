const { addDict, getAll, findById, update, remove, findByLetter } = require('../controllers/dict.controller');

const router = require('express').Router();

router.post("/", addDict)
router.get("/all", getAll)
router.get("/:id", findById)
router.get("/letter/:letter", findByLetter)
router.put("/:id", update)
router.delete("/:id", remove)

module.exports = router