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
    static async ajoutProduit(req, res) {
        console.log(req.body);
        
        const id_produit = await ProductModel.add(req.body.productName, req.body.productPrice, req.body.category);
        res.redirect('/');
    }
}

module.exports = ProductController