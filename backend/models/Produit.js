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
            const query = 'SELECT * FROM produits';

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
                    JOIN categorie c ON a.id_categorie = c.id_categorie;
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

    static async getBydId(id) {
        const db = getDB();
        try {
            const query = `SELECT * FROM produit WHERE id_produit = id`;
            const [results] = await db.query(query);
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
                const results = [];
                const queryProduit = `INSERT INTO produit (nom, prix) VALUES ?`;
                const valuesProduit = [nom, prix]
    
                const [resultsProduit] = await db.query(queryProduit, valuesProduit);
                console.log("resultats de l'insertion :", resultsProduit);
                const produitId = resultsProduit.insertId;

                if (categories.length) {
                    const queryCategorie = `INSERT INTO appartenir (id_produit, id_categorie) VALUES ?`
                    const valuesCategorie = categories.map(categorieId => [produitId, categorieId])
                    const [resultsCategorie] = await db.query(queryCategorie, valuesCategorie);

                    results = [...resultsProduit, ...resultsCategorie];
                }
                else {
                    results = [...resultsProduit];
                }
                return results;

            } catch (error) {
                console.error("Erreur lors de la récupération des produits avec catégories :", error);
                throw error;
            }
    }
    
    static async delete(id) {
        const db = getDB();

        try {
            const queryProduit = `DELETE FROM appartenir WHERE id_produit = ?`
            const queryAppartenir = `DELETE FROM produit WHERE id_produit = ?`
            const values = [id]
            const [resultsCategorie] = await db.query(queryAppartenir, values);
            const [resultsProduit] = await db.query(queryProduit, values);
            return [...resultsCategorie, ...resultsProduit];
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
            const query = `UPDATE produits SET ${fields.join(", ")} WHERE id_produit = ?`;
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
            await db.query('DELETE FROM appartenir WHERE id_produit = ?', [id]);

            if (categories.length) {
                const query = `INSERT FROM appartenir (id_produit, id_categorie) VALUES ?`
                const values = categories.map(categorieId => [id_produit, categorieId]);
                const [results] = await db.query(query, values);
                return results;
            }
        }
        catch (error) {
            console.error('Erreur lors de la mise à jour des catégories du produit : ', error);
            throw error;
        }
    }




    // ANCIENNE VERSION ==========================

    static async loadAll(){
        const dataProduit = await this.getAllWithCategories()
        
        const result = []
        // ================== a mettre dans le controlleur ===============
        dataProduit.forEach(element => {
            const produit = new Produit(element.produit_nom, element.prix)
            produit.id_produit = element.id_produit
            produit.nom = element.produit_nom
            produit.prix = element.prix
            produit.nom_categorie = element.categorie_nom
            
            result.push(produit)
        });
        return result
    }

    static async loadById(id){
        const data = await this.service.getById(id)
        return data
    }
    static async loadByCategorie(id_categorie){
        const data = await service.getById("id_categorie", id_categorie)
        return data
    }
    static async getCategorie(id_produit) {
        const idCategorie = await serviceAppartenir.getById("id_produit", id_produit)
        return idCategorie;
    }

    // static async addAppartenir(id_produit, id_categorie) {
    //     await serviceAppartenir.add({id_produit, id_categorie})
    // }
    static modify(id, data) {
        serviceProduit.update(id, data);
    }
}

module.exports = Produit