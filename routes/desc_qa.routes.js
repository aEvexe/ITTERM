const { addDescQa, getAll, findById, update, remove} = require('../controllers/desc_qa.controller');

const router = require('express').Router();

router.post("/", addDescQa) 
router.get("/all", getAll)
router.get("/:id", findById)
router.put("/:id", update)
router.delete("/:id", remove)

module.exports = router