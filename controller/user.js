const User = require('../models/user')
const passport = require('passport')

module.exports = {
    showRegisterForm: async (req, res) => {
        res.render("user/register")
    },

    showLoginForm: async (req, res) => {
        res.render('user/login')
    },

    register: async (req, res) => {
        console.log(req.body)
        try {
            const user = await User.register(new User({ username: req.body.username }), req.body.password)
            req.flash("success", "Usuario registrado com sucesso")
            res.redirect('/')
        } catch (error) {
            req.flash("error", error)
            res.redirect('/user/register')
        }
    },

    login: async (req, res) => {
        try {
            const handler = passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/login',
                failureFlash: 'Erro ao logar usuario, usuario ou senha incorretos'
            })(req, res)
            
        } catch (error) {
            console.log(error)
            res.send("fuck")
        }
    },

    logout: async (req, res) => {
        console.log(req.user)
        if (req.user != undefined) req.logout(function(err) {
            if (err) {
                req.flash('error', 'Erro ao deslogar')
                res.redirect('/')
            } else {
                req.flash("success", "Deslogado com sucesso")
                res.redirect("/")
            }
        }) 
        else res.redirect('/')
    }
}