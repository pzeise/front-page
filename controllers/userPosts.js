const express = require('express')
const router = express.Router()

const SubPage = require('../models/subPage-model')
const UserPost = require('../models/userPost-model')

//index of Posts in a subPage
router.get('/:subPage', (req, res) => {
    SubPage.find({title: req.params.subPage})
    .then(sub => res.send(sub.posts))
    .catch(console.error)
})

module.exports = router