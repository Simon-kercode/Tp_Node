const express = require('express');
const router = express.Router();
const ProduitController = require('../controllers/ProduitController');
const {authMiddleware} = require("../middlewares/authMiddleware");
const {csrfMiddleware} = require("../middlewares/csrfMiddleware");

router.get('/', ProduitController.getAll);
router.get('/categories', ProduitController.getAllWithCategories);
router.get('/:id', ProduitController.getById);
router.post('/', authMiddleware, csrfMiddleware, ProduitController.create);
router.put('/:id', authMiddleware, csrfMiddleware, ProduitController.update);
router.delete('/:id', authMiddleware, csrfMiddleware, ProduitController.delete);


module.exports = router;