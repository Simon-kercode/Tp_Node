const express = require('express');
const router = express.Router();
const {login, logout} = require("../controllers/AuthController");
const {authMiddleware} = require("../middlewares/authMiddleware")

router.post("/login", login);
router.post("/logout", logout)
router.get("/profil", authMiddleware, (req, res) => {
    res.json({ message: "Bienvenue sur ton profil.", user: {email: req.user.email, role: req.user.role}});
});
module.exports = router;