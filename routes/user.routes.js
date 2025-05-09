const { addUser, getAll, findById, update, remove} = require('../controllers/user.controller');

const router = require('express').Router();

router.post("/", addUser)
router.get("/all", getAll)
router.get("/:id", findById)
router.put("/:id", update)
router.delete("/:id", remove)

module.exports = router