const express = require('express');
const CategorieController = require('../controllers/CategorieController');
const router = express.Router();

router.get('/', CategorieController.getAll);
router.get('/:id', CategorieController.getById)
router.post('/', CategorieController.create);
router.put('/:id', CategorieController.update);
router.delete('/:id', CategorieController.delete);


module.exports = router;