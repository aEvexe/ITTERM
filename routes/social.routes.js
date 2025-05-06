const { addSocial, getAll, findById, update, remove} = require('../controllers/social.controller');

const router = require('express').Router();

router.post("/", addSocial)
router.get("/all", getAll)
router.get("/:id", findById)
router.put("/:id", update)
router.delete("/:id", remove)

module.exports = router