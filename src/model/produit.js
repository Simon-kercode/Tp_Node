const MySqlService = require("../service/MySqlService")
const serviceProduit = new MySqlService(
    'localhost',
    3306,
    'root',
    '',
    'Tp_Node',
    'produit',
    ['id', 'nom', 'prix']
);
const serviceAppartenir = new MySqlService(
    'localhost',
    3306,
    'root',
    '',
    'Tp_Node',
    'appartenir',
    ['id_produit', 'id_categorie']
)

class Produit {
    #nom
    #prix
    static instance

    constructor(nom, prix) {
        this.#nom = nom
        this.#prix = prix
    }

    getNom() {
        return this.#nom
    }
    getPrix() {
        return this.#prix
    }

    setNom(nom){
        nom = this.#nom
    }
    setPrix(prix){
        prix = this.#prix
    }

    async loadAll(){
        const data = await service.getAll()
        const result = []
        data.forEach(element => {
            const produit = new Produit(element.nom, element.prix)
            produit.id_produit = element.id_produit
            produit.nom = element.nom
            produit.prenom = element.prenom
            
            result.push(produit)
        });
        return result
    }

    static async loadById(id){
        const data = await this.service.getById(id)
        return data
    }
    static async loadByCategorie(id_categorie){
        const data = await service.getById(id_categorie)
        return data
    }
    static async add(nom, prix, id_categorie) {
        const produit = new Produit(nom, prix);

        const result = await serviceProduit.add({
            nom: produit.nom,
            prix: produit.prix
        });

        const id_produit = result.insertId;

        this.addAppartenir(id_produit, id_categorie);
    }
    static addAppartenir(id_produit, id_categorie) {
        serviceAppartenir.add({id_produit, id_categorie})
    }
}

module.exports = Produit