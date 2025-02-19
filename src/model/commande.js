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

    getStatut() {
        return this.#statut
    }
    getTotal() {
        return this.#total
    }
    getDate_commande() {
        return this.#date_commande
    }

    setStatut(statut){
        statut = this.#statut
    }
    setTotal(total){
        total = this.#total
    }
    setDate_commande(date_commande){
        date_commande = this.#date_commande
    }
}

module.exports = Commande