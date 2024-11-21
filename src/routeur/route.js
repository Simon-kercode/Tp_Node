// const express = require('express')
// const Controller = require('../controller/controller')

// const router = express.Router()

// router.get("/", Controller.afficheAll)

// module.exports = router

const GenericController = require('./GenericController');
const Compte = require('./models/Compte');
const Produit = require('./models/Produit');
const MysqlService = require('./services/MysqlService');

// Initialiser le service
const mysqlService = new MysqlService(/* vos paramètres de connexion */);
GenericController.setService(mysqlService);

// Configurer vos routes
app.get('/comptes', GenericController.afficheAll(Compte, 'panier'));
app.get('/produits', GenericController.afficheAll(Produit, 'panier'));