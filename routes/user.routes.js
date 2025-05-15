const { login, addUser, getAll, findById, update, remove, logout} = require('../controllers/user.controller');
const userJwtGuard = require('../middleware/guards/user-jwt.guard');
const userSelfGuard = require('../middleware/guards/user-self.guard');

const router = require('express').Router();

router.post("/", addUser)
router.post("/login", login)
router.get("/logout", logout)
router.get("/all", userJwtGuard, getAll)
router.get("/:id", userJwtGuard, userSelfGuard, findById)
router.put("/:id", update)
router.delete("/:id", remove)

module.exports = router