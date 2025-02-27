const express = require('express');
const UserController = require('../controllers/UserController');
const {authMiddleware} = require("../middlewares/authMiddleware")
const router = express.Router();

router.get('/', authMiddleware, UserController.getAll);
router.get('/:id', authMiddleware, UserController.getById)
router.post('/', authMiddleware, UserController.create);
router.put('/:id', authMiddleware, UserController.update);
router.delete('/:id', authMiddleware, UserController.delete);


module.exports = router;