const express = require('express');
const router = express.Router();
const ProduitController = require('../controllers/ProduitController');
const {authMiddleware} = require("../middlewares/authMiddleware")

router.get('/', ProduitController.getAll);
router.get('/categories', ProduitController.getAllWithCategories);
router.get('/:id', ProduitController.getById);
router.post('/', authMiddleware, ProduitController.create);
router.put('/:id', authMiddleware, ProduitController.update);
router.delete('/:id', authMiddleware, ProduitController.delete);


module.exports = router;