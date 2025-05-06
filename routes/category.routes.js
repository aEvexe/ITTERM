const { addCategory, getAll, findById, update, remove} = require('../controllers/category.controller');

const router = require('express').Router();

router.post("/", addCategory)
router.get("/all", getAll)
router.get("/:id", findById)
router.put("/:id", update)
router.delete("/:id", remove)

module.exports = router