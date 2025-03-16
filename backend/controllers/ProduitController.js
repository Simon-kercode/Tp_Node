const Produit = require('../models/Produit');
const multer = require("multer");
const path = require("path");

class ProduitController {

    /**
     * Récupère tous les produits depuis la base de données.
     * Retourne un tableau d'objets produit au format JSON.
     */
    static async getAll(req, res) {
        try {
            const produitsData = await Produit.getAll();
            console.log("produits data :", produitsData);
            
            res.json(produitsData);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des produits.", error });
        }
    }

    /**
     * Récupère un produit spécifique par son ID.
     * Retourne le produit trouvé ou une erreur 404 s'il n'existe pas.
     */
    static async getById(req, res) {
        
        try {
            const produit = await Produit.getById(req.params.id);
            if (!produit) return res.status(404).json({ message: "Produit non trouvé" });

            res.json(produit);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération du produit.", error });
        }
    }

    /**
     * Récupère tous les produits avec leur catégorie associée.
     * Retourne une liste de produits avec les informations de la catégorie.
     */
    static async getAllWithCategories(req, res) {
        try {
            const produitsData = await Produit.getAllWithCategories();
            console.log("Produits récupérés :", produitsData);

            res.json(produitsData);
        }
        catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des produits", error });
        }
    }

    /**
     * Crée un nouveau produit avec les données fournies.
     * Retourne le produit créé.
     */
    static async create(req, res) {
        try {
            const { nom, prix, description, illustration, categories } = req.body;
            const file = req.file;
            const produit = new Produit(nom, prix);
            await Produit.create(nom, prix, categories, description, illustration, file);
            res.status(201).json(produit);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création du produit.", error });
        }
    }

    /**
     * Met à jour un produit existant en fonction de l'ID fourni.
     * Retourne le produit mis à jour ou une erreur 404 si le produit n'existe pas.
     */
    static async update(req, res) {
        console.log("arrivé ici !")
        try {
            console.log("req : ", req.body, req.file)
            const produit = await Produit.getById(req.params.id);
            if (!produit) return res.status(404).json({ message: "Produit non trouvé" });
            const data = req.body;
            const file = req.file;
            const updatedProduit = await Produit.update(req.params.id, data, file);

            res.json({ message: "Produit mis à jour", produit: updatedProduit });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour du produit.", error: error.message});
        }
    }

    /**
     * Supprime un produit en fonction de l'ID fourni.
     * Retourne un message de confirmation ou une erreur 404 si le produit n'existe pas.
     */
    static async delete(req, res) {
        try {
            const produit = await Produit.getById(req.params.id);
            if (!produit) return res.status(404).json({ message: "Produit non trouvé" });

            await Produit.delete(req.params.id);
            res.json({ message: "Produit supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression du produit.", error });
        }
    }
}

module.exports = ProduitController;
