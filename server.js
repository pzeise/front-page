require('dotenv').config()
const express = require('express')
const subPageControllers = require('./controllers/subPages')
const userPostControllers = require('./controllers/userPosts')
const methodOverride = require('method-override')
const ejsLayouts = require('express-ejs-layouts')

const app = express()
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use('/r', subPageControllers)
app.use('/r', userPostControllers)



const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Front Page app is running on port ${port}`)
})