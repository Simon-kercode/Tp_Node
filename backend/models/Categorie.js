const {getDB} = require('../config/db')

// Création de la class ainsi que son attribut 
class Categorie {

    categorieNom

    constructor(nom){
        this.categorieNom = nom
    }

    // Méthode pour récupérer le nom de la catégorie
    getNom(){
        return this.categorieNom
    }

    // Méthode pour changer le nom de la catégorie
    setNomCategorie(nom){
        this.categorieNom = nom;
    }

    // Récupérer toutes les catégories depuis la base de données
    static async getAll() {
        const db = getDB();
        try {
            
            const query = 'SELECT * FROM categorie';
            
            const [results] = await db.query(query);
            console.log("resultats :", results);
            
            return results;
        }
        catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
            throw error;
        }
    }

    // Récupérer une catégorie par son ID
    static async getById(id) {
        const db = getDB();
        try {
            const query = `SELECT * FROM categorie WHERE id_categorie = ?`;
            const values = [id]
            const [results] = await db.query(query, values);
            return results;
        }
        catch (error) {
            console.error(`Erreur lors de la récupération de la catégorie n°${id} :`, error);
            throw error;
        }
    }
    
    // Ajouter une nouvelle catégorie
    static async create(nom) {
        const db = getDB();

        try {
            const query = `INSERT INTO categorie (nom) VALUES (?)`;
            const values = [nom];

            const [results] = await db.query(query, values);
            return results;
        }
        catch (error) {
            console.error("Erreur lors de la création de la catégorie : ", error);
            throw error;
        }
    }

    // Supprimer une catégorie par son ID
    static async delete(id) {
        const db = getDB();

        try {
             const query = `DELETE FROM categorie WHERE id_categorie = ?`
             const values = [id];

             const [results] = await db.query(query, values);
             return results
        }
        catch (error) {
            console.error("Erreur lors de la suppression de la catégorie :", error)
            throw error;
        }
    }

    // Mettre à jour une catégorie
    static async update(id, data) {

        const db = getDB();

        try {
            const values = [];

            if (data.nom) {
                values.push(data.nom);
            }
            else throw new Error("Aucune donnée valide à mettre à jour.");

            values.push(id);
            const query = `UPDATE categorie SET nom = ? WHERE id_categorie = ?`;
            const results = await db.query(query, values);

            return results
        }
        catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur : ", error);
            throw error;
        }
    }
}
module.exports = Categorie