const {getDB} = require('../../config/db')

class ProduitService {
    async getAllProduitsWithCategories() {
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
                JOIN catégorie c ON a.id_categorie = c.id_categorie;
            `;

            const [results] = await db.query(query);
            console.log("resultats :", results);
            
            return results;
        } catch (error) {
            console.error("Erreur lors de la récupération des produits avec catégories :", error);
            throw error;
        }
    }
    async addProduit(data) {
        
        const db = getDB();
        try {
            const query = `INSERT INTO produit (nom, prix) VALUES (?, ?)`;
            const values = [data.nom, data.prix]

            const [results] = await db.query(query, values);
            console.log("resultats de l'insertion :", results);
            
            return results;
        } catch (error) {
            console.error("Erreur lors de la récupération des produits avec catégories :", error);
            throw error;
        }
    }
}

module.exports = ProduitService;