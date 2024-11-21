const MySqlService = require("../service/MySqlService")
const service = new MySqlService(
    'localhost',
    3306,
    'root',
    '',
    'Tp_Node',
    '_user',
    ['id', 'nom', 'prenom', 'mail', 'pwd', 'isAdmin']
);

class User {
    #nom
    #prenom
    #mail
    #pwd
    #isAdmin

    constructor(n, p, m, pwd) {
        this.#nom = n,
        this.#prenom = p,
        this.#mail = m
        this.#pwd = pwd,
        this.#isAdmin = false
    }
    static async loadAll() {
        const data = await service.getAll()
        const result = []
        data.forEach(element => {
            const user = new User(element.nom, element.prenom, element.mail, element.pwd)
            user.nom = element.nom
            user.id = element.id

            result.push(user)
        });
        return result
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