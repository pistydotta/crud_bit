const express = require('express')
const router = express.Router()
const {renderHomePage} = require('../controller/index')

router.get('/', renderHomePage)

module.exports = router