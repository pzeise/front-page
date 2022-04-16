const express = require('express')
const router = express.Router()

const SubPage = require('../models/subPage-model')
const UserPost = require('../models/userPost-model')

router.get('/', (req, res) => {
    res.send(`hackerman: we're in`)
})