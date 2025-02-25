class Commande {
    #statut
    #total
    #date_commande
    #moyen_paiement

    constructor(statut, total, date_commande) {
        this.#statut = statut
        this.#total = total
        this.#date_commande = date_commande
    }

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

    // TODO: vérifier moyen paiement en fonction du statut

    static async getAll() {
        const db = getDB();
        try {
            const query = `SELECT * FROM commande`;

            const [results] = await db.query(query);
            return results;
        }
        catch (error) {
            console.error("Erreur lors de la récupération des commandes :", error);
            throw error;
        }
    }
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

    static async create(data) {
        const db = getDB();

        try {
            const query = `INSERT INTO commande (statut, total, date_commande, moyen_paiement) VALUES (?, ?, ?, ?)`;
            const values = [data.statut, data.total, data.date_commande, data.moyen_paiment];

            const [results] = await db.query(query, values);
            return results;
        }
        catch (error) {
            console.error("Erreur lors de la création de l'utilisateur : ", error);
            throw error;
        }
    }
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
    static async update(id, data) {

        const db = getDB();

        try {
            const fields = [];
            const values = [];

            if (data.nom) {
                fields.push("statut = ?");
                values.push(data.nom);
            }
            if (data.prenom) {
                fields.push("total = ?");
                values.push(data.prix);
            }
            if (data.mail) {
                fields.push("date_commande = ?");
                values.push(data.mail);
            }
            if (data.pwd) {
                fields.push("moyen_paiement = ?");
                values.push(data.pwd);
            }
            if (fields.length === 0) {
                throw new Error("Aucune donnée valide à mettre à jour.");
            }

            values.push(id);
            const query = `UPDATE commande SET ${fields.join(", ")} WHERE id_commande = ?`;
            const results = await db.query(query, values);

            return results
        }
        catch (error) {
            console.error("Erreur lors de la mise à jour de la commande : ", error);
            throw error;
        }
    }

}

module.exports = Commande