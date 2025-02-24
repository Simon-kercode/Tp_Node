const express = require('express');
import ProduitController from '../controllers/ProduitController';
const router = express.Router();

router.get('/', ProduitController.getAll);
router.get('/', ProduitController.getById);
router.get('/', ProduitController.getAllWithCategories);
router.post('/', ProduitController.create);
router.put('/', ProduitController.update);
router.delete('/', ProduitController.delete);


module.exports = router;