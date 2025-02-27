const express = require('express');
const CommandeController = require('../controllers/CommandeController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, CommandeController.getAll);
router.get('/:id', authMiddleware, CommandeController.getById)
router.post('/', authMiddleware, CommandeController.create);
router.put('/:id', authMiddleware, CommandeController.update);
router.delete('/:id', authMiddleware, CommandeController.delete);


module.exports = router;