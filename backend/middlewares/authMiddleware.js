const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Accès refusé." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token invalide" });
    }    
}

exports.roleMiddleware = (requiredRole) => (req, res, next) =>{
    console.log(req.user);
    
    if (!req.user || req.user.role !== requiredRole) {
        return res.status(403).json({message: "Accès interdit !"});
    }
    next();
}

