const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.login = async (req, res) => {
    try {
        const { mail, pwd } = req.body;
        console.log(req.body);
        
        // Vérification de l'utilisateur
        console.log('email envoyé :', mail);
        
        const user = await User.getByEmail(mail);
        console.log(user);
        
        if (!user) return res.status(401).json({ message: "Utilisateur non trouvé" });

        // Vérification du mot de passe
        const isMatch = await bcrypt.compare(pwd, user.pwd);
        
        if (!isMatch) return res.status(401).json({ message: "Mot de passe incorrect" });
        
        // Création du token
        const token = jwt.sign(
            { id: user.id_user, email: user.mail },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        console.log(token);
        
        res.json({ message: "Connexion réussie", token });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};