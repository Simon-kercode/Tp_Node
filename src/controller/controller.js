const Categorie = require('../model/categorie')
const Commande = require('../model/commande')
const Produit = require('../model/produit')
const User = require('../model/user')


const compte = new Compte(data.num, data.nom)
if (data.solde < 0) {
    compte.debit(-data.solde)
} else {
    compte.credit(data.solde)
}

class CompteController {
    static affiche(req, res) {

        res.render("compte", { compte: compte })
    }
    static credit(req, res) {
        compte.credit(req.body.credit)
        res.redirect('/')
    }
    static debit(req, res) {
        compte.debit(req.body.debit)
        res.redirect('/')
    }
}

module.exports = CompteController