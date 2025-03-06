const express = require('express');
const router = express.Router();
const {login, logout} = require("../controllers/AuthController");
const {authMiddleware} = require("../middlewares/authMiddleware");
const {csrfMiddleware} = require("../middlewares/csrfMiddleware");

router.post("/login", csrfMiddleware, login);
router.post("/logout", csrfMiddleware, logout)
router.get("/profil", authMiddleware, (req, res) => {
    res.json({ message: "Bienvenue sur ton profil.", user: {email: req.user.email, role: req.user.role}});
});
module.exports = router;