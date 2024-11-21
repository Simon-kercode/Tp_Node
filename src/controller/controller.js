const Compte = require('../model/compte')
const data = require("../data/compte.json")

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