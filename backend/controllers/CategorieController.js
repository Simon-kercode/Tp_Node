const Categorie = require('../models/Categorie')

class CategorieController {


    /**
     * Récupère toutes les catégories de la base de données.
     * Retourne un tableau d'objets catégorie au format JSON.
     */
    static async getAll(req, res) {
        try {
            const categoriesData = await Categorie.getAll();
            res.json(categoriesData);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des catégories.", error});
        }
    }

    /**
     * Récupère une catégorie spécifique par son ID.
     * Retourne la catégorie si elle est trouvée, sinon une erreur 404.
     */
    static async getById(req, res) {
        try {
            const categorie = await Categorie.getById(req.params.id);
            if (!categorie) return res.status(404).json({ message: "Catégorie non trouvée" });
            res.json(categorie);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération de la catégorie", error });
        }
    }

    /**
     * Crée une nouvelle catégorie avec le nom fourni dans le corps de la requête.
     * Retourne la catégorie créée.
     */
    static async create(req, res) {
        try {
            const { nom } = req.body;
            const categorie = new Categorie(nom);
            await Categorie.create(nom);
            res.status(201).json(categorie);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création de la catégorie.", error });
        }
    }

     /**
     * Met à jour une catégorie existante en fonction de l'ID fourni.
     * Retourne la catégorie mise à jour ou une erreur 404 si elle n'existe pas.
     */
    static async update(req, res) {
        try {
            const categorie = await Categorie.getById(req.params.id);
            if (!categorie) return res.status(404).json({ message: "Catégorie non trouvée" });
            const data = req.body;
            const updatedCategorie = await Categorie.update(req.params.id, data);

            res.json({ message: "Catégorie mise à jour", categorie: updatedCategorie });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour de la catégorie.", error });
        }
    }

    /**
     * Supprime une catégorie en fonction de l'ID fourni.
     * Retourne un message de confirmation ou une erreur 404 si la catégorie n'existe pas.
     */
    static async delete(req, res) {
        try {
            const categorie = await Categorie.getById(req.params.id);
            if (!categorie) return res.status(404).json({ message: "Catégorie non trouvée" });

            await Categorie.delete(req.params.id);
            res.json({ message: "Catégorie supprimée avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de la catégorie.", error });
        }
    }
}

module.exports = CategorieController;
