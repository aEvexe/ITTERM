const { addAdmin, getAll, findById, update, remove} = require('../controllers/admin.controller');

const router = require('express').Router();

router.post("/", addAdmin)
router.get("/all", getAll)
router.get("/:id", findById)
router.put("/:id", update)
router.delete("/:id", remove)

module.exports = router