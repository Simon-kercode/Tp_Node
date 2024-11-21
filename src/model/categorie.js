const MySqlService = require("../service/MySqlService");
const Crud = require("./CRUD");
const service = new MySqlService(
    'localhost',
    3306,
    'root',
    '',
    'Tp_Node',
    'catégorie',
    ['id_categorie', 'nom']
);


class Categorie extends Crud {
    #nomCategorie
    constructor(data){
        super(data)
        this.#nomCategorie = data.nomCategorie || ''
    }

    static async loadAll() {
        return super.loadAll(service, Categorie);
    }

    get nomCategorie(){
        return this.#nomCategorie
    }
    set nomCategorie(nomCategorie){
        nomCategorie = this.#nomCategorie
    }
}