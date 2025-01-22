const Compte = require('../model/user')

// const data = require("../data/compte.json")

class CompteController {
    static serviceStockage = null

    static setService(service) {
        console.log("service ok !", service);

        CompteController.serviceStockage = service
    }

    static affiche(req, res) {
        const id = req.params.id
        Compte.loadbyId(CompteController.serviceStockage, id).then(compte => {
            console.log(compte.toString());
            res.render("compte", { compte: compte })
        })
    }
    static ajoutForm(req, res) {
        res.render("ajoutForm")
    }
    static ajoutCompte(req, res) {
        Compte.add(req.body.numero, req.body.nom)
        res.redirect('/')
    }
    static afficheAll(req, res) {
        Compte.loadAll(CompteController.serviceStockage).then(users => {
            console.log(users);

            res.render("panier", { users: users })
        })
    }
    static credit(req, res) {
        const id = req.params.id
        Compte.loadbyId(CompteController.serviceStockage, id).then(compte => {
            compte.credit(req.body.credit)
            res.redirect(`/compte/${id}`)
        })
    }
    static debit(req, res) {
        const id = req.params.id
        Compte.loadbyId(CompteController.serviceStockage, id).then(compte => {
            compte.debit(req.body.debit)
            res.redirect(`/compte/${id}`)
        })
    }
}

module.exports = CompteController