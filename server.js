require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
const ejsLayouts = require('express-ejs-layouts')
const passportSetup = require('./config/passport-setup')
const passport = require('passport')
const session = require('express-session')


// const subPageControllers = require('./controllers/subPages')
// const userPostControllers = require('./controllers/userPosts')
// const authControllers = require('./controllers/authControllers')

const app = express()
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    cookie: {},
    saveUninitialized: true
  }))
app.use(passport.initialize())
app.use(passport.session())


const subPageControllers = require('./controllers/subPages')
const userPostControllers = require('./controllers/userPosts')
const authControllers = require('./controllers/authControllers')

app.use('/r', subPageControllers)
app.use('/r', userPostControllers)
app.use('/u', authControllers)



const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Front Page app is running on port ${port}`)
})