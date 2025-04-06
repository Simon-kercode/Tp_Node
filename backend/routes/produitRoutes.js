const express = require('express');
const multer = require('multer');
const {multerMiddleware} = require('../middlewares/multerMiddleware')
const upload = multer({ storage: multerMiddleware })
const router = express.Router();

const ProduitController = require('../controllers/ProduitController');
const {authMiddleware, roleMiddleware} = require("../middlewares/authMiddleware");
const {csrfMiddleware} = require("../middlewares/csrfMiddleware");
const {validateProduitMiddleware} = require("../middlewares/validateProduitMiddleware");

router.get('/', ProduitController.getAll);
router.get('/categories', ProduitController.getAllWithCategories);
router.get('/:id', ProduitController.getById);
router.post('/', authMiddleware, csrfMiddleware, roleMiddleware(1), validateProduitMiddleware, upload.single('file'), ProduitController.create);
router.put('/:id', authMiddleware, csrfMiddleware, roleMiddleware(1), validateProduitMiddleware, upload.single('file'), ProduitController.update);
router.delete('/:id', authMiddleware, csrfMiddleware, roleMiddleware(1), ProduitController.delete);


module.exports = router;