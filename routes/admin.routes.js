const { login, addAdmin, getAll, findById, update, remove, logout, refreshToken} = require('../controllers/admin.controller');
const adminJwtGuard = require('../middleware/guards/admin-jwt.guard');
const adminSelfGuard = require('../middleware/guards/admin-self.guard');

const router = require('express').Router();

router.post("/", addAdmin)
router.post("/login", login)
router.post("/logout", logout)
router.post("/refresh", refreshToken)
router.get("/all", adminJwtGuard, getAll)
router.get("/:id", adminJwtGuard, adminSelfGuard, findById)
router.put("/:id", update)
router.delete("/:id", remove)

module.exports = router