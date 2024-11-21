const MySqlService = require("../service/MySqlService");
const Crud = require("./CRUD");
const service = new MySqlService(
    'localhost',
    3306,
    'root',
    '',
    'Tp_Node',
    'produit',
    ['id_produit', 'nom', 'prix']
);


class Produit extends Crud {
    #nom
    #prix
    constructor(data) {
        super(data)
        this.#nom = data.nom || ''
        this.#prix = data.prix || ''
    }

    static async loadAll() {
        return super.loadAll(service, Produit);
    }

    
    loadById(Id){
        
    }
    loadByCategorie(categorie){
        
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

   

}

module.exports = Produit