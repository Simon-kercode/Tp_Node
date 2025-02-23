const Categorie = require('../models/Categorie')

class CategoryController {

    static async getAll(req, res) {
        try {
            const categoriesData = await Category.getAll();
            const categories = categoriesData.map(category => new Categorie(category.nom, category.id_categorie));
            res.json(categories);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des catégories.", error });
        }
    }

    static async getById(req, res) {
        try {
            const category = await Categorie.getById(req.params.id);
            if (!category) return res.status(404).json({ message: "Catégorie non trouvée" });
            res.json(category);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération de la catégorie", error });
        }
    }

    static async create(req, res) {
        try {
            const { nom } = req.body;
            const category = new Categorie(nom);
            await category.create();
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création de la catégorie.", error });
        }
    }

    static async update(req, res) {
        try {
            const category = await Categorie.getById(req.params.id);
            if (!category) return res.status(404).json({ message: "Catégorie non trouvée" });
            const data = req.body;
            const updatedCategory = await Categorie.update(req.params.id, data);

            res.json({ message: "Catégorie mise à jour", category: updatedCategory });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour de la catégorie.", error });
        }
    }

    static async delete(req, res) {
        try {
            const category = await Categorie.getById(req.params.id);
            if (!category) return res.status(404).json({ message: "Catégorie non trouvée" });

            await Categorie.delete(req.params.id);
            res.json({ message: "Catégorie supprimée avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de la catégorie.", error });
        }
    }
}

module.exports = CategoryController;
