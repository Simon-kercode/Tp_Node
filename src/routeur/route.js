const express = require('express')
const CompteController = require('../controller/controller')

const router = express.Router()

router.get("/", CompteController.afficheAll)

module.exports = router