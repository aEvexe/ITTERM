const { addDesc, getAll, findById, update, remove} = require('../controllers/desc.controller');

const router = require('express').Router();

router.post("/", addDesc)
router.get("/all", getAll)
router.get("/:id", findById)
router.put("/:id", update)
router.delete("/:id", remove)

module.exports = router