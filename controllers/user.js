const express = require('express')
const router = express.Router()

const SubPage = require('../models/subPage-model')
const UserPost = require('../models/userPost-model')

router.get('/home', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('test', {isLogin: true, timer: req.session.cookie.maxAge / 1000})
    } else {
        res.render('test', {isLogin: false})
    }
})


module.exports = router

