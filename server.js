require('dotenv').config()
const express = require('express')
const subPageControllers = require('./controllers/subPages')
const userPostControllers = require('./controllers/userPosts')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/r', subPageControllers)
app.use('/r', userPostControllers)



const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Front Page app is running on port ${port}`)
})