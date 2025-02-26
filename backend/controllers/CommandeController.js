const Commande = require('../models/Commande')

class CommandeController {

    static async getAll(req, res) {
        try {
            const commandesData = await Commande.getAll();
            const commandes = commandesData.map(commande => new Commande(commande.statut, commande.total, commande.date_commande));
            res.json(commandes);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des commandes.", error });
        }
    }

    static async getById(req, res) {
        try {
            const commande = await Commande.getById(req.params.id);
            if (!commande) return res.status(404).json({ message: "Commande non trouvée" });
            res.json(commande);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération de la commande", error });
        }
    }

    static async create(req, res) {
        
        try {
            const { statut, total, date_commande, moyen_paiement, id_user, produits } = req.body;
            const commande = new Commande(statut, total, date_commande, moyen_paiement,id_user);
            await Commande.create({statut, total, date_commande, moyen_paiement, id_user, produits});
            res.status(201).json(commande);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création de la commande.", error });
        }
    }

    static async update(req, res) {
        try {
            const commande = await Commande.getById(req.params.id);
            if (!commande) return res.status(404).json({ message: "Catégorie non trouvée" });
            const data = req.body;
            const updatedCommande = await Commande.update(req.params.id, data);

            res.json({ message: "Commande mise à jour", commande: updatedCommande });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour de la commande.", error });
        }
    }

    static async delete(req, res) {
        try {
            const commande = await Commande.getById(req.params.id);
            if (!commande) return res.status(404).json({ message: "Catégorie non trouvée" });

            await Commande.delete(req.params.id);
            res.json({ message: "Commande supprimée avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de la commande.", error });
        }
    }
}

module.exports = CommandeController