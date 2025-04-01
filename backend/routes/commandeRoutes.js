const express = require('express');
const CommandeController = require('../controllers/CommandeController');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');
const {csrfMiddleware} = require("../middlewares/csrfMiddleware");
const router = express.Router();

router.get('/', authMiddleware, roleMiddleware(1), CommandeController.getAll);
router.get('/produits', authMiddleware, roleMiddleware(1), CommandeController.getAllWithProducts);
router.get('/:id', authMiddleware, CommandeController.getById)
router.get('/user/:id,', authMiddleware, CommandeController.getAllUserOrders)
router.post('/', authMiddleware, csrfMiddleware, CommandeController.create);
router.put('/:id', authMiddleware, csrfMiddleware, roleMiddleware(1), CommandeController.update);
router.delete('/:id', authMiddleware, csrfMiddleware, roleMiddleware(1), CommandeController.delete);


module.exports = router;