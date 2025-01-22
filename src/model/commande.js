class Commande {
    #statut
    #total
    #date_commande
    #moyen_paiement

    constructor(statut, total, date_commande) {
        this.#statut = statut
        this.#total = total
        this.#date_commande = date_commande
    }

    get statut() {
        return this.#statut
    }
    get total() {
        return this.#total
    }
    get date_commande() {
        return this.#date_commande
    }

    set statut(statut){
        statut = this.#statut
    }
    set total(total){
        total = this.#total
    }
    set date_commande(date_commande){
        date_commande = this.#date_commande
    }
}

module.exports = Commande