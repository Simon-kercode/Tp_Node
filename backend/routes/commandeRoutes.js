const express = require('express');
const CommandeController = require('../controllers/CommandeController');
const router = express.Router();

router.get('/', CommandeController.getAll);
router.get('/', CommandeController.getById)
router.post('/', CommandeController.create);
router.put('/', CommandeController.update);
router.delete('/', CommandeController.delete);


module.exports = router;