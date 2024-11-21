class Categorie extends Produit {

    #nom

    constructor(nom){
        this.#nom = nom
    }

    getNom(){
        return this.#nom
    }
    setNomCategorie(nom){
        nom= this.#nom
    }
}