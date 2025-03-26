const jwt = require("jsonwebtoken");

// Middleware d'authentification
exports.authMiddleware = (req, res, next) => {
    // Récupération du token
    const token = req.cookies.jwt
    
    // Vérifie si aucun token n'est fourni
    if (!token) {
        return res.status(401).json({ message: "Accès refusé." });
    }

    try {
        // Vérification et décodage du token avec la clé secrète stockée dans les variables d'environnement
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Ajout des informations du token décodé à l'objet req (pour une utilisation dans les prochains middlewares/routes)
        req.user = decoded;
        console.log(req.user)
        // Passe au middleware suivant ou au contrôleur
        next();
    } catch (error) {
        res.status(401).json({ message: "Token invalide" });
    }    
}

// Middleware d'autorisation basé sur les rôles
exports.roleMiddleware = (requiredRole) => (req, res, next) =>{
    console.log(req.user);
    
    // Vérifie si l'utilisateur est défini et s'il a le rôle requis
    if (!req.user || req.user.role !== requiredRole) {
        return res.status(403).json({message: "Accès interdit !"});
    }
    next();
}

