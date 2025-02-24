const Produit = require('../models/Produit');

class ProduitController {

    static async getAll(req, res) {
        try {
            const produitsData = await Produit.getAll();
            const produits = produitsData.map(produit => new Produit(produit.nom, produit.prix));
            res.json(produits);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des produits.", error });
        }
    }

    static async getById(req, res) {
        
        try {
            const produit = await Produit.getById(req.params.id);
            if (!produit) return res.status(404).json({ message: "Produit non trouvé" });

            res.json(produit);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération du produit.", error });
        }
    }

    static async getAllWithCategories(req, res) {
        try {
            const produitsData = await Produit.getAllWithCategories();
            console.log("Produits récupérés :", produitsData);
            const produits = produitsData.map(element => {
                const produit = new Produit(element.produit_nom, element.prix);
                produit.id_produit = element.id_produit;
                produit.nom_categorie = element.categorie_nom;
                return produit;
            });
            res.json(produits);
        }
        catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des produits", error });
        }
    }

    static async create(req, res) {
        try {
            const { nom, prix, categories } = req.body;
            const produit = new Produit(nom, prix);
            await produit.create(nom, prix, categories);
            res.status(201).json(produit);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création du produit.", error });
        }
    }

    static async update(req, res) {
        try {
            const produit = await Produit.getById(req.params.id);
            if (!produit) return res.status(404).json({ message: "Produit non trouvé" });
            const data = req.body;
            const updatedProduit = await Produit.update(req.params.id, data);

            res.json({ message: "Produit mis à jour", produit: updatedProduit });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour du produit.", error });
        }
    }

    static async delete(req, res) {
        try {
            const produit = await Produit.getById(req.params.id);
            if (!produit) return res.status(404).json({ message: "Produit non trouvé" });

            await produit.delete(req.params.id);
            res.json({ message: "Produit supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression du produit.", error });
        }
    }
}

module.exports = ProduitController;
