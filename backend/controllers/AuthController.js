// Pour générer et vérifier des tokens JWT
const jwt = require("jsonwebtoken");
// Pour hacher et comparer les mots de passe
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.login = async (req, res) => {
    console.log("Données reçues du frontend :", req.body);
    try {
        const { mail, pwd } = req.body;

        if (!mail || !pwd) {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }
        
        // Vérification de l'utilisateur
        const user = await User.getByEmail(mail);

        if (!user) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        // Vérification du mot de passe
        const isMatch = await bcrypt.compare(pwd, user.pwd);
        
        if (!isMatch) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }
        
        // Création du token
        const token = jwt.sign(
            { id: user.id_user, name: user.nom, firstname: user.prenom, email: user.mail, role: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        // stockage du token dans un cookie HTTPONLY
        res.cookie("jwt", token, {
            httpOnly: true, // Empêche l'accès au cookie via JavaScript
            secure: process.env.NODE_ENV === "production", // true en production
            sameSite: "Strict", // Protection contre les attaques CSRF
            maxAge: 2 * 60 * 60 * 1000, // Expiration du cookie (2h)
        });
        
        return res.status(200).json({ message: "Connexion réussie", token });
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.logout = async (req, res) => {
    console.log('arrivé ici');
    
    try {
        console.log(req.cookies);
        
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });
        console.log(req.cookies);
        
        return res.json({message: "Déconnexion réussie"})        
    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
        return res.status(500).json({message : "Erreur de déconnexion : ", error: error?.message})
    }

}