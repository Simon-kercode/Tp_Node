const express = require('express');
const UserController = require('../controllers/UserController');
const {authMiddleware} = require("../middlewares/authMiddleware");
const {csrfMiddleware} = require("../middlewares/csrfMiddleware");
const router = express.Router();

router.get('/', authMiddleware, UserController.getAll);
router.get('/:id', authMiddleware, UserController.getById)
router.post('/', csrfMiddleware, UserController.create);
router.put('/:id',csrfMiddleware, authMiddleware, UserController.update);
router.delete('/:id',csrfMiddleware, authMiddleware, UserController.delete);


module.exports = router;