const { addDict, getAll, findById, update, remove, findByLetter } = require('../controllers/dict.controller');
const authorExpertGuard = require('../middleware/guards/author-expert.guard');
const authorJwtGuard = require('../middleware/guards/author-jwt.guard');

const router = require('express').Router();

router.post("/", /*authorJwtGuard*/ /*authorExpertGuard*/ addDict)
router.get("/all", getAll)
router.get("/:id", findById)
router.get("/letter/:letter", findByLetter)
router.put("/:id", update)
router.delete("/:id", remove)

module.exports = router