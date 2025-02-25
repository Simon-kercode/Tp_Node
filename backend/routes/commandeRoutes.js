const express = require('express');
const CommandeController = require('../controllers/CommandeController');
const router = express.Router();

router.get('/', CommandeController.getAll);
router.get('/:id', CommandeController.getById)
router.post('/', CommandeController.create);
router.put('/:id', CommandeController.update);
router.delete('/:id', CommandeController.delete);


module.exports = router;