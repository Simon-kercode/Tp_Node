const Compte = require('../model/user')
const Produit = require('../model/produit')


// class CompteController {
//     static serviceStockage = null

//     static setService(service) {
//         console.log("service ok !", service);

//         CompteController.serviceStockage = service
//     }

//     static affiche(req, res) {
//         const id = req.params.id
//         Compte.loadbyId(CompteController.serviceStockage, id).then(compte => {
//             console.log(compte.toString());
//             res.render("compte", { compte: compte })
//         })
//     }
//     static ajoutForm(req, res) {
//         res.render("ajoutForm")
//     }
//     static ajoutCompte(req, res) {
//         Compte.add(req.body.numero, req.body.nom)
//         res.redirect('/')
//     }
//     static afficheAll(req, res) {
//         Compte.loadAll(CompteController.serviceStockage).then(users => {
//             console.log(users);

//             res.render("panier", { users: users })
//         })
//     }
//     static afficheAll(req, res) {
//         Produit.loadAll(CompteController.serviceStockage).then(produits => {
//             console.log(produits);

//             res.render("panier", { produits: produits })
//         })
//     }
// }

// module.exports = CompteController
class GenericController {
    static serviceStockage = null;

    static setService(service) {
        GenericController.serviceStockage = service;
    }

    static afficheAll(ModelClass, viewName) {
        return async (req, res) => {
            try {
                if (!GenericController.serviceStockage) {
                    throw new Error("Service de stockage non initialisé");
                }

                const items = await ModelClass.loadAll(GenericController.serviceStockage);
                console.log(items);

                const modelName = ModelClass.name.toLowerCase() + 's'; // ex: 'users', 'produits'
                res.render(viewName, { [modelName]: items });
            } catch (error) {
                console.error(`Erreur lors du chargement des ${ModelClass.name}:`, error);
                res.status(500).send("Erreur serveur");
            }
        };
    }
}

module.exports = GenericController;