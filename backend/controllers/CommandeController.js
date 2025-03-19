const Commande = require('../models/Commande')

class CommandeController {

    /**
     * Récupère toutes les commandes de la base de données.
     * Retourne un tableau d'objets commande au format JSON.
     */
    static async getAll(req, res) {
        try {
            const commandesData = await Commande.getAll();
            res.json(commandesData);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des commandes.", error });
        }
    }

    static async getAllWithProducts(req, res) {
        try {
            const commandesData = await Commande.getAllWithProducts();
            console.log("commandes récupérées : ", commandesData);
            
            res.json(commandesData);
        } catch (error) {
            res.status(500).json({message: "Errur lors de la récupération des commandes avec produits.", error});
        }
    }
    /**
     * Récupère une commande spécifique par son ID.
     * Vérifie que l'utilisateur est bien celui qui a passé la commande, sinon envoie une erreur 403.
     * Retourne la commande si elle est trouvée, sinon une erreur 404.
     */
    static async getById(req, res) {
        try {
            const userId = req.user.id;
            const commande = await Commande.getById(req.params.id);
            if (!commande) return res.status(404).json({ message: "Commande non trouvée" });

            if (commande.id_user !== userId && req.user.role !== 1) {
                return res.status(403).json({ message: "Accès interdit" });
            }

            res.json(commande);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération de la commande", error });
        }
    }

    /**
     * Crée une nouvelle commande avec les données fournies dans le corps de la requête.
     * Retourne la commande créée.
     */
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

    /**
     * Met à jour une commande existante en fonction de l'ID fourni.
     * Retourne la commande mise à jour ou une erreur 404 si elle n'existe pas.
     */
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

    /**
     * Supprime une commande en fonction de l'ID fourni.
     * Retourne un message de confirmation ou une erreur 404 si la commande n'existe pas.
     */
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