const express = require('express')
const router = express.Router()

const trainService = require('../services/train.service.js')


//router.get('/', trainService.getWords)

router.post('/', trainService.postWords)

module.exports = router