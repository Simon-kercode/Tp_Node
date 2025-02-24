const express = require('express');
const CategorieController = require('../controllers/CategorieController');
const router = express.Router();

router.get('/', CategorieController.getAll);
router.get('/', CategorieController.getById)
router.post('/', CategorieController.create);
router.put('/', CategorieController.update);
router.delete('/', CategorieController.delete);


module.exports = router;