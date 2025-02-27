const express = require('express');
const CategorieController = require('../controllers/CategorieController');
const {authMiddleware} = require("../middlewares/authMiddleware")
const router = express.Router();

router.get('/', authMiddleware, CategorieController.getAll);
router.get('/:id', authMiddleware, CategorieController.getById)
router.post('/', authMiddleware, CategorieController.create);
router.put('/:id', authMiddleware, CategorieController.update);
router.delete('/:id', authMiddleware, CategorieController.delete);


module.exports = router;