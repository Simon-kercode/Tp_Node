const express = require('express');
import ProduitController from '../controllers/ProduitController';
const router = express.Router();

router.get('/', ProduitController.getAllProduits);
router.post('/', ProduitController.addProduit);

module.exports = router;