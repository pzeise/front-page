const express = require('express')
const router = express.Router()

const SubPage = require('../models/subPage-model')
const UserPost = require('../models/userPost-model')

//index
router.get('/all', (req, res) => {
    SubPage.find({})
    .then(subs => res.send(subs))
    .catch(console.error)
})

module.exports = router