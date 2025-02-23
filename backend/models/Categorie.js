const MySqlService = require("../service/MySqlService")
const service = new MySqlService(
    'catégorie',
    ['id', 'nom']
);

class Categorie {

    categorieNom

    constructor(nom){
        this.categorieNom = nom
    }

    getNom(){
        return this.categorieNom
    }
    setNomCategorie(nom){
        nom= this.categorieNom
    }
    
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

    static async getById(id) {
        const db = getDB();
        try {
            const query = `SELECT * FROM commande WHERE id_commande = id`;
            const [results] = await db.query(query);
            return results;
        }
        catch (error) {
            console.error(`Erreur lors de la récupération de la commande n°${id} :`, error);
            throw error;
        }
    }
    
    static async create(nom) {
        const db = getDB();

        try {
            const query = `INSERT INTO categorie (nom) VALUES ?`;
            const values = [nom];

            const [results] = await db.query(query, values);
            return results;
        }
        catch (error) {
            console.error("Erreur lors de la création de la catégorie : ", error);
            throw error;
        }
    }

    static async delete(id) {
        const db = getDB();

        try {
             const query = `DELETE FROM _user WHERE id_categorie = ?`
             const values = [id];

             const [results] = await db.query(query, values);
             return results
        }
        catch (error) {
            console.error("Erreur lors de la suppression de la catégorie :", error)
            throw error;
        }
    }

    static async update(id, nom) {

        const db = getDB();

        try {
            const values = [];

            if (nom) {
                values.push(data.nom);
            }
            else throw new Error("Aucune donnée valide à mettre à jour.");

            values.push(id);
            const query = `UPDATE _user SET nom = ? WHERE id_user = ?`;
            const results = await db.query(query, values);

            return results
        }
        catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur : ", error);
            throw error;
        }
    }



    // static async loadAll(){
    //     const data = await service.getAll()
    //     const result = []
    //     data.forEach(element => {
    //         const categorie = new Categorie(element.nom)
    //         categorie.id_categorie = element.id_categorie
    //         categorie.nom = element.nom
            
    //         result.push(categorie)
    //     });
    //     return result
    // }
    // static async loadById(id){
    //     const data = await this.service.getById(id)
    //     return data
    // }
}
module.exports = Categorie