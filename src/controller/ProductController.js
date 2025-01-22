const ProductModel = require('../model/produit');

class ProductController {

    static afficheAllProduits(req, res) {
        ProductModel.loadAll().then(products => {
            console.log(products);
            if (products) {
                // products.forEach(product => {
                //     ProductModel.getCategorie(product.id_produit)
                // })
                res.render("accueil", { products: products })
            }
            else res.render("accueil", {products: "Aucun produit enregistré"});
        })
    }
    static ajoutProduit(req, res) {
        
        ProductModel.add(req.body.nom, req.body.prix, req.body.id_categorie);
        ProductModel.addAppartenir(req.body.id_produit, req.body.id_categorie);
        res.redirect('accueil');
    }
}

module.exports = ProductController