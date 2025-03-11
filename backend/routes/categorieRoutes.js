const express = require('express');
const CategorieController = require('../controllers/CategorieController');
const {authMiddleware} = require("../middlewares/authMiddleware")

// Création du routeur Express pour gérer les routes de catégorie
const router = express.Router();

// Route GET pour récupérer toutes les catégories
router.get('/', CategorieController.getAll);

// Route GET pour récupérer une catégorie spécifique par son ID
router.get('/:id', CategorieController.getById)

// Route POST pour créer une nouvelle catégorie. Cette route est protégée par le middleware d'authentification.
router.post('/', authMiddleware, CategorieController.create);

// Route PUT pour mettre à jour une catégorie existante par son ID. 
router.put('/:id', authMiddleware, CategorieController.update);

// Route DELETE pour supprimer une catégorie par son ID. 
router.delete('/:id', authMiddleware, CategorieController.delete);


module.exports = router;