require('dotenv').config()
require('./config/db_connect')


const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const flash = require('connect-flash');

const bodyParser = require("body-parser")
const passport = require('passport')
const localStrategy = require('passport-local')

const userModel = require('./models/user')
const userRoutes = require('./routes/user')

const indexRoutes = require('./routes/index')

app.set("view engine", "ejs")
app.use(express.static("views"))
app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(flash())


app.use(require('express-session')({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(userModel.authenticate()))
passport.serializeUser(userModel.serializeUser())
passport.deserializeUser(userModel.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next()
})

app.use(userRoutes)
app.use(indexRoutes)


app.listen(port, () => {
    console.log("App listening on port: " + port)
})