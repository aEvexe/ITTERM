const { addQuestion, getAll, findById, update, remove} = require('../controllers/question.controller');

const router = require('express').Router();

router.post("/", addQuestion) 
router.get("/all", getAll)
router.get("/:id", findById)
router.put("/:id", update)
router.delete("/:id", remove)

module.exports = router