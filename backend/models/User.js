const { getDB } = require("../config/db");
const bcrypt = require("bcryptjs");
const MySqlService = require("../service/MySqlService")
const service = new MySqlService(
    '_user',
    ['id', 'nom', 'prenom', 'mail', 'pwd', 'isAdmin']
);

class User {
    #nom
    #prenom
    #mail
    #pwd
    #isAdmin
    #id

    constructor(n, p, m, pwd) {
        this.#nom = n,
        this.#prenom = p,
        this.#mail = m
        this.#pwd = pwd,
        this.#isAdmin = false
    }
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
    toString() {
        return `Nom : ${this.#nom}\nPrenom : ${$this.#prenom}\n Email : ${this.#mail}`
    }

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

    static async getAll() {
        const db = getDB();
        try {
            const query = `SELECT * FROM _user`;

            const [results] = await db.query(query);
            console.log(results);
            
            return results;
        }
        catch (error) {
            console.error("Erreur lors de la récupération des produits :", error);
            throw error;
        }
    }

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
    static async getByEmail(email) {
        const db = getDB();
        try {
            const query = `SELECT * FROM _user WHERE mail = ?`;
            const values = [email];
            const [results] = await db.query(query, values);
            return results;
        }
        catch (error) {
            console.error(`Erreur lors de la récupération de l'utilisateur :`, error);
            throw error;
        }
    }
    static async create(data) {
        const db = getDB();

        try {
            if (!data.nom || !data.prenom || !data.mail || !data.pwd) {
                throw new Error("Tous les champs sont obligatoires");
            }
            if (!/\S+@\S+\.\S+/.test(data.mail)) {
                throw new Error("L'adresse e-mail est invalide");
            }
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

    static async delete(id) {
        const db = getDB();

        try {
             const query = `DELETE FROM _user WHERE id_user = ?`
             const values = [id];

             const [results] = await db.query(query, values);
             return results
        }
        catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur :", error)
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
            if (data.prenom) {
                fields.push("prenom = ?");
                values.push(data.prenom);
            }
            if (data.mail) {
                fields.push("mail = ?");
                values.push(data.mail);
            }
            if (data.pwd) {
                const hashedPwd = await bcrypt.hash(data.pwd, 10)
                fields.push("pwd = ?");
                values.push(hashedPwd);
            }
            if (fields.length === 0) {
                throw new Error("Aucune donnée valide à mettre à jour.");
            }

            values.push(id);
            const query = `UPDATE _user SET ${fields.join(", ")} WHERE id_user = ?`;
            const results = await db.query(query, values);

            return results
        }
        catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur : ", error);
            throw error;
        }
    }

    // static async loadAll() {
    //     const data = await service.getAll()
    //     const result = []
    //     data.forEach(element => {
    //         const user = new User(element.nom, element.prenom, element.mail, element.pwd)
    //         user.id_user = element.id_user
    //         user.nom = element.nom
    //         user.prenom = element.prenom
    //         user.mail = element.mail
            
    //         result.push(user)
    //     });
    //     return result
    // }
    // static async loadById(id) {
    //     const data = await service.getById(id)
    //     return data
    // }
    // static async add() {
    //     service.add(new User(nom, prenom, mail, pwd))
    // }
    // static async modify(id, data) {
    //    const isUpdate = service.update(id, data);

    //    return isUpdate ? 'Utilisateur mis à jour' : 'Erreur lors de la mise à jour'
    // }

}

module.exports = User