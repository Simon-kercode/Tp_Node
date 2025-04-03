const express = require('express');
const UserController = require('../controllers/UserController');
const {authMiddleware, roleMiddleware} = require("../middlewares/authMiddleware");
const {csrfMiddleware} = require("../middlewares/csrfMiddleware");
const router = express.Router();

router.get('/', authMiddleware, roleMiddleware(1), UserController.getAll);
router.get('/:id', authMiddleware, UserController.getById)
router.post('/', csrfMiddleware, roleMiddleware(1), UserController.create);
router.put('/:id',csrfMiddleware, authMiddleware, UserController.update);
router.delete('/:id',csrfMiddleware, authMiddleware, roleMiddleware(1), UserController.delete);


module.exports = router;