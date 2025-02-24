const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/', UserController.getAll);
router.get('/', UserController.getById)
router.post('/', UserController.create);
router.put('/', UserController.update);
router.delete('/', UserController.delete);


module.exports = router;