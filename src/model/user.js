const MySqlService = require("../service/MySqlService");
const Crud = require("./CRUD");
const service = new MySqlService(
    'localhost',
    3306,
    'root',
    '',
    'Tp_Node',
    '_user',
    ['id', 'nom', 'prenom', 'mail', 'pwd', 'isAdmin']
);

class User extends Crud {
    #nom
    #prenom
    #mail
    #pwd
    #isAdmin

    constructor(data) {
        super(data);
        this.#nom = data.nom || '';
        this.#prenom = data.prenom || '';
        this.#mail = data.mail || '';
        this.#pwd = data.pwd || '';
        this.id_user = data.id_user;
    }
    static async loadAll() {
        return super.loadAll(service, User);
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
}

module.exports = User