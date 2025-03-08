exports.csrfMiddleware = (req, res, next) => {
    const csrfTokenHeader = req.headers["x-csrf-token"];
    const csrfTokenCookie = req.cookies.csrfToken;

    if (!csrfTokenHeader || !csrfTokenCookie || csrfTokenHeader !== csrfTokenCookie) {
        return res.status(403).json({ message: "Échec de la vérification CSRF." });
    }

    next();
};