const express = require('express')
const router = express.Router()
const { showRegisterForm, showLoginForm, login, register, logout, isLoggedIn } = require('../controller/user')

router.get("/register", showRegisterForm)
router.get("/login", showLoginForm)
router.post("/register", register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/testeauth', isLoggedIn, (req, res) => {
    res.send("SAlveee")
})


module.exports = router