const express = require('express');
const router = express.Router();
const {login} = require("../controllers/AuthController");
const {authMiddleware} = require("../middlewares/authMiddleware")

router.post("/login", login);
router.get("/profil", authMiddleware, (req, res) => {
    res.json({ message: "Bienvenue sur ton profil sécurisé !", user: req.user });
});
module.exports = router;