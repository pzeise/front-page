const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

//try to login
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

//get the redirect after login
router.get('/google/redirect', passport.authenticate('google'), 
    (req, res, next) => {
        user = req.user
        res.send(user)
    })

module.exports = router