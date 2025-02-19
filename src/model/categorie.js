const MySqlService = require("../service/MySqlService")
const service = new MySqlService(
    'catégorie',
    ['id', 'nom']
);

class Categorie {

    categorieNom

    constructor(nom){
        this.categorieNom = nom
    }

    getNom(){
        return this.categorieNom
    }
    setNomCategorie(nom){
        nom= this.categorieNom
    }
    
    static async loadAll(){
        const data = await service.getAll()
        const result = []
        data.forEach(element => {
            const categorie = new Categorie(element.nom)
            categorie.id_categorie = element.id_categorie
            categorie.nom = element.nom
            
            result.push(categorie)
        });
        return result
    }
    static async loadById(id){
        const data = await this.service.getById(id)
        return data
    }
}
module.exports = Categorie