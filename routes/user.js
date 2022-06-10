const express = require('express')
const router = express.Router()
const { showRegisterForm, showLoginForm, login, register, logout } = require('../controller/user')

router.get("/register", showRegisterForm)
router.get("/login", showLoginForm)
router.post("/register", register)
router.post('/login', login)
router.get('/logout', logout)


module.exports = router