const User = require('../models/User')

class UserController {

    static async getAll(req, res) {
        try {
            const usersData = await User.getAll();
            const users = usersData.map(user => new User(user.nom, user.prix));
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs.", error });
        }
    }

    static async getById(req, res) {
        try {
            const user = await User.getBydId(req.params.id);
            if (!user)  return res.status(404).json({ message: "Utilisateur non trouvé" });
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: `Erreur lors de la récupération de l'utilisateur`, error });
        }
    }

    static async create(req, res) {
        try {
            const { nom, prix } = req.body;
            // ###########################################################################
            // !!!!!!!!!!!!!!!!!!!!!!!!!!!! TODO : HASH DU PWD !!!!!!!!!!!!!!!!!!!!!!!!!!!
            // ###########################################################################
            const user = new User(nom, prenom, mail, pwd);
            await user.create();
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création de l'utilisateur.", error });
        }
    }

    static async update(req, res) {
        try {
            const user = await User.getById(req.params.id);
            if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
            const data = req.body;
            const updatedUser = await User.update(req.params.id, data);


            res.json({ message: "Utilisateur mis à jour", user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur.", error });
        }
    }

    static async delete(req, res) {
        try {
            const user = await User.getById(req.params.id);
            if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

            await user.delete(req.params.id);
            res.json({ message: "Utilisateur supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur.", error });
        }
    }
}

module.exports = UserController