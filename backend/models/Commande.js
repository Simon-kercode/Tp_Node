const {getDB} = require('../config/db');

class Commande {
    // Déclaration des propriétés privées
    #statut
    #total
    #date_commande
    #moyen_paiement
    #id_user

    constructor(statut, total, date_commande, id_user) {
        this.#statut = statut
        this.#total = total
        this.#date_commande = date_commande
        this.#id_user = id_user
    }

    // Méthodes getter pour accéder aux attributs privés
    getStatut() {
        return this.#statut
    }
    getTotal() {
        return this.#total
    }
    getDate_commande() {
        return this.#date_commande
    }
    getMoyen_paiement() {
        return this.#moyen_paiement ?? "Aucun moyen de paiement enregistré";
    }
    getId_user() {
        return this.#id_user
    }

    // Méthodes setter pour modifier les valeurs des attributs
    setStatut(statut){
        statut = this.#statut
    }
    setTotal(total){
        total = this.#total
    }
    setDate_commande(date_commande){
        date_commande = this.#date_commande
    }
    setMoyen_paiment(moyen_paiement) {
        this.#moyen_paiement = moyen_paiement;
    }

    // Méthode statique pour récupérer toutes les commandes
    static async getAll() {
        const db = getDB();
        try {
            console.log('arrivé');
            const query = `SELECT * FROM commande`;

            const [results] = await db.query(query);
            console.log(results);
            
            return results;
        }
        catch (error) {
            console.error({message: "Erreur lors de la récupération des commandes :", error: error.message || error});
            throw error;
        }
    }

    // Méthode pour récupérer toutes les commandes, ainsi que ses produits et l'email de l'utilisateur qui a passé la commande
    static async getAllWithProducts() {
        const db = getDB();
        try {
            const query = `
                SELECT
                    commande.*,
                    u.mail AS user_email,
                    GROUP_CONCAT(p.id_produit) AS id_produits,
                    GROUP_CONCAT(p.nom) AS nom_produits
                FROM commande
                JOIN _user u ON u.id_user = commande.id_user
                JOIN contenir c ON c.id_commande = commande.id_commande
                JOIN produit p ON p.id_produit = c.id_produit
                GROUP BY commande.id_commande, u.mail;
            `;

            const [results] = await db.query(query);
            console.log("Récupération commandes et produits : ", results);
            // On renvoit les données formatées
            return results.map(commande => ({
                ...commande,
                id_produits: commande.id_produits ? commande.id_produits.split(",").map(Number) : [],
                nom_produits: commande.nom_produits ? commande.nom_produits.split(",") : []
            }));
        } catch (error) {
            console.error("Erreur lors de la récupération des commandes avec produits : ", error);
            throw error;
        }
    }
    // Méthode pour récupérer une commande par son ID
    static async getById(id) {
        const db = getDB();
        try {
            const query = `SELECT * FROM commande WHERE id_commande = ?`;
            const values = [id];
            const [results] = await db.query(query, values);
            return results;
        }
        catch (error) {
            console.error(`Erreur lors de la récupération de la commande n°${id} :`, error);
            throw error;
        }
    }

    // Méthode pour récupérer toutes les commandes d'un utilisateur
    static async getAllUserOrders(id) {
        const db = getDB();
        try {
            const query = `SELECT * FROM commande where id_user = ?`;
            const values = [id];
            const [results] = await db.query(query, values);
            return results;
        } catch (error) {
            console.error("Erreur lors de la récupération des commandes de l'utilisateur :", error);
        }
    }
    // Méthode pour créer une nouvelle commande
    static async create(data) {
        const db = getDB();

        try {
            const queryCommande = `INSERT INTO commande (statut, total, date_commande, moyen_paiement, id_user) VALUES (?, ?, ?, ?, ?)`;
            const valuesCommande = [data.statut, data.total, data.date_commande, data.moyen_paiement, data.id_user];

            const [resultsCommande] = await db.query(queryCommande, valuesCommande);
            const commandeId = resultsCommande.insertId;

            if (data.produits.length) {
                const queryProduit = `INSERT INTO contenir (id_produit, id_commande) VALUES ${data.produits.map(() => "(?, ?)").join(", ")}`;
                const valuesProduit = data.produits.flatMap(produitId => [produitId, commandeId]);
                const [resultsProduit] = await db.query(queryProduit, valuesProduit);

                return {commande: resultsCommande, produit: resultsProduit};
            }
            else return {commande: resultsCommande};
        }
        catch (error) {
            console.error("Erreur lors de la création de l'utilisateur : ", error);
            throw error;
        }
    }
    
    // Méthode pour supprimer une commande par son ID
    static async delete(id) {
        const db = getDB();

        try {
             const query = `DELETE FROM commande WHERE id_commande = ?`
             const values = [id];

             const [results] = await db.query(query, values);
             return results
        }
        catch (error) {
            console.error("Erreur lors de la suppression de la commande:", error)
            throw error;
        }
    }
    // TODO : update table contenir
    static async update(id, data) {

        const db = getDB();

        try {
            const fields = [];
            const values = [];

            if (data.statut) {
                fields.push("statut = ?");
                values.push(data.statut);
            }
            if (data.total) {
                fields.push("total = ?");
                values.push(data.total);
            }
            if (data.date_commande) {
                fields.push("date_commande = ?");
                values.push(data.date_commande);
            }
            if (data.moyen_paiement) {
                fields.push("moyen_paiement = ?");
                values.push(data.moyen_paiement);
            }
            if (data.produits) {
                this.updateCommande(id, data.produits);
            }
            if (fields.length === 0) {
                throw new Error("Aucune donnée valide à mettre à jour.");
            }

            values.push(id);
            const query = `UPDATE commande SET ${fields.join(", ")} WHERE id_commande = ?`;
            await db.query(query, values);

            const queryUpdatedOrder = `SELECT * FROM commande WHERE id_commande = ?`;
            const idCommande = [id]
            const updatedOrder = await db.query(queryUpdatedOrder, idCommande);

            return updatedOrder[0];
        }
        catch (error) {
            console.error("Erreur lors de la mise à jour de la commande : ", error);
            throw error;
        }
    }

    static async updateCommande(id_commande, produits) {
        const db = getDB();

        try {
            // On supprime les ancienntes associations pour éviter les doublons
            await db.query('DELETE FROM contenir WHERE id_commande = ?', [id_commande]);

            if (produits.length) {
                const query = `INSERT INTO contenir (id_commande, id_produit) VALUES ${produits.map(() => "(?, ?)").join(", ")}`
                const values = produits.flatMap(produitsId => [id_commande, produitsId]);
                const [results] = await db.query(query, values);
                return results;
            }
        }
        catch (error) {
            console.error('Erreur lors de la mise à jour des catégories du commande : ', error);
            throw error;
        }
    }
}


module.exports = Commande