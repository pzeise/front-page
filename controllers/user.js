const express = require('express')
const router = express.Router()

const SubPage = require('../models/subPage-model')
const UserPost = require('../models/userPost-model')
const User = require('../models/user-model')

router.get('/home', (req, res) => {
    if (req.isAuthenticated()) {
        User.findById(req.session.passport.user)
        .then(user => {
            user.populate('posts')
            res.render('userProfile', {
                user: user, 
                isLogin: true,
                timer: req.session.cookie.maxAge / 1000,
                edit: false    
            })
        }) 
    } else {
        res.render('userProfile', {
            user: null, 
            isLogin: false, 
            timer: null,
            edit: false    
        })
    }
})

router.get('/home/edit', (req, res) => {
    if (req.isAuthenticated()) {
        User.findById(req.session.passport.user)
        .then(user => {
            user.populate('posts')
            res.render('userProfile', {
                user: user, 
                isLogin: true,
                timer: req.session.cookie.maxAge / 1000,
                edit: true    
            })
        }) 
    } else {
        res.render('userProfile', {
            user: null, 
            isLogin: false, 
            timer: null,
            edit: false    
        })
    }
})

router.put('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        User.findByIdAndUpdate(req.params.id, {
            name: req.body.name
        })
        .then(user => {
            res.redirect('/u/home')
        })
    } else {
        res.redirect('/u/home')
    }
})

router.delete('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        User.findById(req.params.id)
        .then(user => {
            UserPost.deleteMany({_id:{$in:user.posts}})
            .then(deleted => console.log(deleted))
            User.findOneAndDelete(user)
            .then(deleted => {
                console.log(deleted)
                res.redirect('/r/all')
            })
        })
    } else {
        res.redirect('/u/home')
    }
})

module.exports = router

