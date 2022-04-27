require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
const ejsLayouts = require('express-ejs-layouts')
const passportSetup = require('./config/passport-setup')
const passport = require('passport')
const session = require('express-session')
const app = express()
const MongoStore = require('connect-mongo')

const authControllers = require('./controllers/authControllers')

app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    cookie: {},
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: process.env.DB_URL}),
    cookie: { maxAge: 600000 }
  }))
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.authenticate('session'))


const subPageControllers = require('./controllers/subPages')
const userPostControllers = require('./controllers/userPosts')
const userControllers = require('./controllers/user')

app.use('/r', subPageControllers)
app.use('/r', userPostControllers)
app.use('/u', authControllers)
app.use('/u', userControllers)
app.use('/node_modules', express.static(__dirname + '/node_modules'))



const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Front Page app is running on port ${port}`)
})