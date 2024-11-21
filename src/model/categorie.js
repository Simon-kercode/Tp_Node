class Categorie extends Produit {
    #nomCategorie
    constructor(nomCategorie){
        this.#nomCategorie = nomCategorie
    }

    get nomCategorie(){
        return this.#nomCategorie
    }
    set nomCategorie(nomCategorie){
        nomCategorie = this.#nomCategorie
    }
}