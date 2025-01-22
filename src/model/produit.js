const MySqlService = require("../service/MySqlService");
const ProduitService = require("../service/ProduitService");
const Categorie = require("./categorie");

const serviceProduit = new MySqlService(
    'produit',
    ['id_produit', 'nom', 'prix']
);
const serviceAppartenir = new MySqlService(
    'appartenir',
    ['id_produit', 'id_categorie']
)
const produitService = new ProduitService

class Produit {
    #nom
    #prix

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

    static async loadAll(){
        const dataProduit = await produitService.getAllProduitsWithCategories()
        
        const result = []
        dataProduit.forEach(element => {
            const produit = new Produit(element.produit_nom, element.prix)
            produit.id_produit = element.id_produit
            produit.nom = element.produit_nom
            produit.prix = element.prix
            produit.nom_categorie = element.categorie_nom
            
            result.push(produit)
        });
        return result
    }

    static async loadById(id){
        const data = await this.service.getById(id)
        return data
    }
    static async loadByCategorie(id_categorie){
        const data = await service.getById("id_categorie", id_categorie)
        return data
    }
    static async getCategorie(id_produit) {
        const idCategorie = await serviceAppartenir.getById("id_produit", id_produit)
        return idCategorie;
    }
    static async add(nom, prix, id_categorie) {
        console.log('nom', nom, "prix", prix);
        
        const produit = new Produit(nom, prix);
        console.log('produit' , produit);
        
        const result = await produitService.addProduit({
            nom: produit.getNom(),
            prix: produit.getPrix()
        });

        if (result && result.insertId) {
            const id_produit = result.insertId;
            console.log('Nouvel id produit :', id_produit);

            await this.addAppartenir(id_produit, id_categorie);
        }
        else {
            throw new Error("Erreur lors de la création du produit");
        }
    }
    static async addAppartenir(id_produit, id_categorie) {
        await serviceAppartenir.add({id_produit, id_categorie})
    }
    static modify(id, data) {
        serviceProduit.update(id, data);
    }
}

module.exports = Produit