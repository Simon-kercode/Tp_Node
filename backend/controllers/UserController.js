const User = require('../models/User')

class UserController {

    static async getAll(req, res) {
        try {
            const usersData = await User.getAll();
            console.log(usersData);
            
            const users = usersData.map(user =>new User(user.nom, user.prenom, user.mail));
            console.log(users);
            
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs.", error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const user = await User.getById(req.params.id);
            if (!user)  return res.status(404).json({ message: "Utilisateur non trouvé" });
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: `Erreur lors de la récupération de l'utilisateur`, error: error.message });
        }
    }
    static async create(req, res) {
        if (!req.body.nom || !req.body.prenom || !req.body.mail || !req.body.pwd) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires." });
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(req.body.mail)) {
            return res.status(400).json({ message: "L'adresse e-mail est invalide." });
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(req.body.pwd)) {
            return res.status(400).json({
                message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
            });
        }
        try {
            const { nom, prenom, mail, pwd } = req.body;
            const user = new User(nom, prenom, mail, pwd);
            await User.create({nom, prenom, mail, pwd});
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création de l'utilisateur.", error: error.message });
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
            res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur.", error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const user = await User.getById(req.params.id);
            if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

            await User.delete(req.params.id);
            res.json({ message: "Utilisateur supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur.", error: error.message });
        }
    }
}

module.exports = UserController