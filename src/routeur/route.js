const express = require('express')
const UserController = require('../controller/UserController')
const ProductController = require('../controller/ProductController')
const CategorieController = require('../controller/CategorieController')

const router = express.Router()

router.get("/", CategorieController.getAllCategories)
router.post("/addProduit", ProductController.ajoutProduit)
module.exports = router