const CategorieModel = require('../model/categorie')

class CategorieController {

    static getAllCategories(req, res) {
        CategorieModel.loadAll().then(categories => {
            console.log(categories);
            res.render("accueil", {categories})
        });
    }
}
module.exports = CategorieController