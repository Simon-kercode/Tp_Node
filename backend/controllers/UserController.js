const { application } = require('express');
const bcrypt = require("bcryptjs");
const User = require('../models/User')

class UserController {

    // Récupérer tous les utilisateurs
    static async getAll(req, res) {
        try {
            const usersData = await User.getAll();
            console.log("Resultats : ", usersData);
            if (usersData) {
                const users = usersData.map(user => ({
                    id: user.id_user,
                    isAdmin: user.isAdmin,
                    name: user.nom,
                    firstname: user.prenom,
                    email: user.mail,
                }));
                console.log("users formattés : ", users);
                res.json(users);              
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs.", error: error.message });
        }
    }

    /* Récupérer un utilisateur via son id.
     * Vérifie que l'utilisateur qui envoie la requete est bien l'utilisateur demandé.
    */
    static async getById(req, res) {
        try {
            const userId = req.user.id
            const user = await User.getById(req.params.id);
            if (!user)  return res.status(404).json({ message: "Utilisateur non trouvé" });

            if(user.id_user !== userId) {
                return res.status(403).json({ message: "Accès interdit" });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: `Erreur lors de la récupération de l'utilisateur`, error: error.message });
        }
    }
    static async create(req, res) {
        
        if (!req.body.nom || !req.body.prenom || !req.body.mail || !req.body.pwd) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires." });
        }
        // Validation de l'adresse e-mail avec une expression régulière
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(req.body.mail)) {
            return res.status(400).json({ message: "L'adresse e-mail est invalide." });
        }
        // Vérification de la complexité du mot de passe (majuscule, minuscule, chiffre, caractère spécial, minimum 8 caractères)
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(req.body.pwd)) {
            return res.status(400).json({
                message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
            });
        }
        try {
            const { nom, prenom, mail, pwd } = req.body;

            const user = await User.create({nom, prenom, mail, pwd});

            const createdUser = await User.getById(user.insertId);
            res.status(201).json({
                id: createdUser[0].id_user,
                nom: createdUser[0].nom,
                prenom: createdUser[0].prenom,
                email: createdUser[0].mail,
                message: "Votre compte a bien été créé !"
            });

        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création de l'utilisateur.", error: error.message });
        }
    }

    // Mettre à jour un utilisateur
    static async update(req, res) {
        try {
            const user = await User.getById(req.params.id);
            if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
            const data = req.body;
            if (data.pwd && data.oldPassword) {
                // Vérification de la complexité du mot de passe (majuscule, minuscule, chiffre, caractère spécial, minimum 8 caractères)
                if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(data.pwd)) {
                    return res.status(400).json({
                        message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
                    });
                }
                // Vérification du mot de passe
                const isMatch = await bcrypt.compare(data.oldPassword, user[0].pwd);
                console.log("ici aussi")
                if (!isMatch) {
                    return res.status(401).json({ message: "Mot de passe incorrect" });
                }
            }
            
            const updatedUser = await User.update(req.params.id, data);

            res.json({ message: "Utilisateur mis à jour", user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur.", error: error.message });
        }
    }

    // Supprimer un utilisateur
    static async delete(req, res) {
        try {
            const user = await User.getById(req.params.id);
            if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

            const deletedUser = await User.delete(req.params.id);
            res.json({ message: "Utilisateur supprimé avec succès", success: deletedUser });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur.", error: error.message });
        }
    }
}

module.exports = UserController