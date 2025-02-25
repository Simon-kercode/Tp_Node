const MySqlService = require("../service/MySqlService");
const {getDB} = require('../config/db')

const serviceProduit = new MySqlService(
    'produit',
    ['id_produit', 'nom', 'prix']
);
const serviceAppartenir = new MySqlService(
    'appartenir',
    ['id_produit', 'id_categorie']
)

class Produit {
    #nom
    #prix

    constructor(nom, prix) {
        this.#nom = nom
        this.#prix = prix
    }

    getNom() {
        return this.#nom;
    }
    getPrix() {
        return this.#prix;
    }

    setNom(nom){
        this.#nom = nom;
    }
    setPrix(prix){
        this.#prix = prix;
    }

    static async getAll() {
        const db = getDB();
        try {
            const query = 'SELECT * FROM produit';

            const [results] = await db.query(query);
            console.log("resultats :", results);
            
            return results;
        }
        catch (error) {
            console.error("Erreur lors de la récupération des produits :", error);
            throw error;
        }
    }
    static async getAllWithCategories() {
        const db = getDB();
        try {
            const query = `
                    SELECT 
                        p.id_produit, 
                        p.nom AS produit_nom, 
                        p.prix, 
                        c.id_categorie, 
                        c.nom AS categorie_nom
                    FROM produit p
                    JOIN appartenir a ON p.id_produit = a.id_produit
                    JOIN categorie c ON a.id_categorie = c.id_categorie
                `;
                const [results] = await db.query(query);
                console.log("resultats :", results);   
                return results;         
        }
        catch (error) {
            console.error("Erreur lors de la récupération des produits avec catégories :", error)
            throw error;
        }
    }

    static async getById(id) {
        const db = getDB();
        try {
            const query = `SELECT * FROM produit WHERE id_produit = ?`;
            const values = [id];
            const [results] = await db.query(query, values);
            return results;
        }
        catch (error) {
            console.error(`Erreur lors de la récupération du produit n°${id} :`, error);
            throw error;
        }
    }

    static async create(nom, prix, categories = []) {
            const db = getDB();
            try {
                const queryProduit = `INSERT INTO produit (nom, prix) VALUES (?, ?)`;
                const valuesProduit = [nom, prix]
    
                const [resultsProduit] = await db.query(queryProduit, valuesProduit);
                console.log("resultats de l'insertion :", resultsProduit);
                const produitId = resultsProduit.insertId;

                if (categories.length) {
                    const queryCategorie = `INSERT INTO appartenir (id_produit, id_categorie) VALUES ${categories.map(() => "(?, ?)").join(", ")}`;
                    const valuesCategorie = categories.flatMap(categorieId => [produitId, categorieId]);  
                    const [resultsCategorie] = await db.query(queryCategorie, valuesCategorie);
                    console.log({produit: resultsProduit, categorie: resultsCategorie});
                    
                    return {produit: resultsProduit, categorie: resultsCategorie};
                }
                else {
                    return {produit: resultsProduit};
                }
            } catch (error) {
                console.error("Erreur lors de la création du produit :", error);
                throw error;
            }
    }
    
    static async delete(id) {
        const db = getDB();

        try {
            const queryProduit = `DELETE FROM produit WHERE id_produit = ?`
            const queryAppartenir = `DELETE FROM appartenir WHERE id_produit = ?`
            const values = [id]
            await db.query(queryAppartenir, values);
            const [resultsProduit] = await db.query(queryProduit, values);
            return resultsProduit;
        }
        catch (error) {
            console.error('Erreur lors de la suppression du produit : ', error);
            throw error;
        }
    }

    static async update(id, data) {
        const db = getDB();

        try {
            const fields = [];
            const values = [];

            if (data.nom) {
                fields.push("nom = ?");
                values.push(data.nom);
            }
            if (data.prix) {
                fields.push("prix = ?");
                values.push(data.prix);
            }
            if (data.categories) {
                this.updateCategories(id, data.categories);
            }
            if (fields.length === 0) {
                throw new Error("Aucune donnée valide à mettre à jour.");
            }

            values.push(id);
            const query = `UPDATE produit SET ${fields.join(", ")} WHERE id_produit = ?`;
            const results = await db.query(query, values);

            return results
        }
        catch (error) {
            console.error("Erreur lors de la mise à jour du produit : ", error);
            throw error;
        }
    }
    
    static async updateCategories(id_produit, categories) {
        const db = getDB();

        try {
            // On supprime les ancienntes associations pour éviter les doublons
            await db.query('DELETE FROM appartenir WHERE id_produit = ?', [id_produit]);

            if (categories.length) {
                const query = `INSERT INTO appartenir (id_produit, id_categorie) VALUES ${categories.map(() => "(?, ?)").join(", ")}`
                const values = categories.flatMap(categorieId => [id_produit, categorieId]);
                const [results] = await db.query(query, values);
                return results;
            }
        }
        catch (error) {
            console.error('Erreur lors de la mise à jour des catégories du produit : ', error);
            throw error;
        }
    }
}

module.exports = Produit