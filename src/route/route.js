const express = require('express')
const CompteController = require('../controller/compteController')

const router = express.Router()

router.get("/", CompteController.affiche)
router.post("/credit", CompteController.credit)
router.post("/debit", CompteController.debit)

module.exports = router