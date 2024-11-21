class Produit {
    #nom
    #prix


    constructor(nom, prix) {
        this.#nom = nom
        this.#prix = prix
    }

    get nom() {
        return this.#nom
    }
    get prix() {
        return this.#prix
    }

    set nom(nom){
        nom = this.#nom
    }
    set prix(prix){
        prix = this.#prix
    }

    loadAll(){
        
    }

    loadById(Id){
        
    }
    loadByCategorie(categorie){
        
    }

}

module.exports = Produit