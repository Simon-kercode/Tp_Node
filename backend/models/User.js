const { getDB } = require("../config/db");
const bcrypt = require("bcryptjs");

class User {
    // Déclaration des propriétés privées
    #nom
    #prenom
    #mail
    #pwd
    #isAdmin
    #id

    constructor(n, p, m) {
        this.#nom = n,
        this.#prenom = p,
        this.#mail = m
        this.#pwd = this.#pwd, // Important : initialisation de #pwd à undefined
        this.#isAdmin = false
    }
    // Méthodes getter pour accéder aux attributs privés
    getNom() {
        return this.#nom
    }
    getPrenom() {
        return this.#prenom
    }
    getMail() {
        return this.#mail
    }
    getRule() {
        return this.#isAdmin
    }

    // Conversion de l'objet User en chaîne de caractères
    toString() {
        return `Nom : ${this.#nom}\nPrenom : ${$this.#prenom}\n Email : ${this.#mail}`
    }

    // Méthodes setter pour modifier les valeurs des attributs
    setNom(nom) {
        this.#nom = nom
    }
    setPrenom(prenom) {
        this.#prenom = prenom
    }
    setMail(mail) {
        this.#mail = mail
    }
    setPwd(pwd) {
        this.#pwd = pwd
    }
    setRule(rule) {
        this.#isAdmin = rule
    }

    // Méthode pour récupérer tous les utilisateurs
    static async getAll() {
        const db = getDB();
        try {
            const query = `SELECT * FROM _user`;

            const [results] = await db.query(query);
            // console.log(results);
            
            return results;
        }
        catch (error) {
            console.error("Erreur lors de la récupération des produits :", error);
            throw error;
        }
    }

    // Récupérer un utilisateur par son ID
    static async getById(id) {
        const db = getDB();
        try {
            const query = `SELECT * FROM _user WHERE id_user = ?`;
            const values = [id];
            const [results] = await db.query(query, values);
            return results;
        }
        catch (error) {
            console.error(`Erreur lors de la récupération de l'utilisateur n°${id} :`, error);
            throw error;
        }
    }

    // Récupérer un utilisateur par son adresse mail
    static async getByEmail(email) {
        const db = getDB();
        try {
            console.log("Recherche de l'utilisateur avec l'email :", email);
            const query = `SELECT * FROM _user WHERE mail = ?`;
            const values = [email];
            const [results] = await db.query(query, values);
            
            return results[0];
        }
        catch (error) {
            console.error(`Erreur lors de la récupération de l'utilisateur :`, error);
            throw error;
        }
    }

    // Créer un nouvel utilisateur
    static async create(data) {
        const db = getDB();

        try {
            const query = `INSERT INTO _user (nom, prenom, mail, pwd) VALUES (?, ?, ?, ?)`; 
            const hashedPwd = await bcrypt.hash(data.pwd, 10);
            const values = [data.nom, data.prenom, data.mail, hashedPwd];

            const [results] = await db.query(query, values);
            return results;
        }
        catch (error) {
            console.error("Erreur lors de la création de l'utilisateur : ", error);
            throw error;
        }
    }

    // Supprimer un utilisateur par son ID
    static async delete(id) {
        const db = getDB();

        try {
             const query = `DELETE FROM _user WHERE id_user = ?`
             const values = [id];

             const [results] = await db.query(query, values);

             const queryDeletedUser = `SELECT id_user AS id FROM _user WHERE id_user = ?`;
             const valuesDeletedUser = [id];
             const deletedUser = await db.query(queryDeletedUser, valuesDeletedUser);
             if (!deletedUser) {
                return true
             }
             else return false;
        }
        catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur :", error)
            throw error;
        }
    }

    // Mettre à jour un utilisateur avec les nouvelles informations
    static async update(id, data) {

        const db = getDB();
        console.log("data dans le modele : ", id, data)
        try {
            const fields = [];
            const values = [];

            if (data.nom) {
                fields.push("nom = ?");
                values.push(data.nom);
            }
            if (data.prenom) {
                fields.push("prenom = ?");
                values.push(data.prenom);
            }
            if (data.mail) {
                fields.push("mail = ?");
                values.push(data.mail);
            }
            if (data.pwd) {
                const hashedPwd = await bcrypt.hash(data.pwd, 10) // Hachage du nouveau mot de passe
                fields.push("pwd = ?");
                values.push(hashedPwd);
            }
            if (data.isAdmin !== undefined) { 
                fields.push("isAdmin = ?"); 
                values.push(data.isAdmin); 
            }
            if (fields.length === 0) {
                throw new Error("Aucune donnée valide à mettre à jour.");
            }

            values.push(id);
            const query = `UPDATE _user SET ${fields.join(", ")} WHERE id_user = ?`;
            await db.query(query, values);

            const queryUpdatedUser = `SELECT id_user AS id, nom AS name, prenom AS firstname, mail AS email, isAdmin FROM _user WHERE id_user = ?`;
            const idUser = [id]
            const updatedUser = await db.query(queryUpdatedUser, idUser);

            return updatedUser[0];
        }
        catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur : ", error);
            throw error;
        }
    }
}

module.exports = User