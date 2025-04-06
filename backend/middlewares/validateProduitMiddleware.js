/* Middleware de validation des données de produits.
 *  Vérifie le format et le contenu de chaque donnée pouvant être présente dans la requête.
 * Si une donnée n'est pas correctement formatée, un statut 400 est renvoyé, accompagné d'un message d'erreur
*/

exports.validateProduitMiddleware = (req, res, next) => {

    if (req.body.nom !== undefined && (typeof req.body.nom !== 'string' || req.body.nom.trim().length < 2 || req.body.nom.trim().length > 100)) {
        return res.status(400).json({ message: "Nom invalide. Il doit contenir entre 2 et 100 caractères." });
    }

    if (req.body.prix !== undefined) {
        const prixNum = parseFloat(req.body.prix);
        if (isNaN(prixNum) || prixNum <= 0) {
            return res.status(400).json({ message: "Prix invalide. Il doit être un nombre positif." });
        }
    }

    if (req.body.description !== undefined && (typeof req.body.description !== 'string')) {
        return res.status(400).json({ message: "Description invalide" });
    }

    if (req.body.illustration !== undefined && typeof req.body.illustration !== 'string') {
        return res.status(400).json({ message: "Illustration invalide." });
    }

    if (req.body.categories !== undefined && (!Array.isArray(req.body.categories) || req.body.categories.some(cat => isNaN(parseInt(cat))))) {
        return res.status(400).json({ message: "La liste des catégories est invalide." });
    }

    next();
}