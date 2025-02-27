const express = require("express");
const router = express.Router();
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, roleMiddleware(1), (req, res) => {
    res.json({ message: "Bienvenue admin !" });
});

module.exports = router;
