const { addSynonym, getAll, findById, update, remove} = require('../controllers/Synonym.controller');

const router = require('express').Router();

router.post("/", addSynonym)
router.get("/all", getAll)
router.get("/:id", findById)
router.put("/:id", update)
router.delete("/:id", remove)

module.exports = router