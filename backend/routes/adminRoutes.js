const express = require("express");
const router = express.Router();
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");

// Route protégée pour l'administrateur
router.get("/", authMiddleware, roleMiddleware(1), (req, res) => {
    // Si l'utilisateur est authentifié et a le bon rôle (admin), on renvoie ce message
    res.json({ message: "Bienvenue admin !" });
});

module.exports = router;
