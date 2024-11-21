const MySqlService = require("../service/MySqlService");
const Crud = require("./CRUD");
const service = new MySqlService(
    'localhost',
    3306,
    'root',
    '',
    'Tp_Node',
    'commande',
    ['id_commande', 'statut', 'total', 'date_commande', 'moyen_paiement', 'id_user']
);


class Commande extends Crud{
    #statut
    #total
    #date_commande
    #moyen_paiement

    constructor(data) {
        super(data);
        this.#statut = data.statut || ''
        this.#total = data.total || ''
        this.#date_commande = data.date_commande || ''
    }
    static async loadAll() {
        return super.loadAll(service, Commande);
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