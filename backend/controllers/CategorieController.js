const Categorie = require('../models/Categorie')

class CategorieController {

    static async getAll(req, res) {
        try {
            const categoriesData = await Categorie.getAll();
            const categories = categoriesData.map(categorie => new Categorie(categorie.id_categorie, categorie.nom));
            res.json(categories);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des catégories.", error});
        }
    }

    static async getById(req, res) {
        try {
            const categorie = await Categorie.getById(req.params.id);
            if (!categorie) return res.status(404).json({ message: "Catégorie non trouvée" });
            res.json(categorie);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération de la catégorie", error });
        }
    }

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
