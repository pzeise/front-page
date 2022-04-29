const express = require('express')
const router = express.Router()
const SubPage = require('../models/subPage-model')
const UserPost = require('../models/userPost-model')

const consoleToggle = Boolean(process.env.DEV_CONSOLE_IS_ON)

const checkMod = function (sub, req) {
    let isMod = sub.mods.includes(req.session.passport.user)
    return isMod
}

//SubPage Index
router.get('/', (req, res) => {
    SubPage.find({})
    .sort({updatedAt: 'desc'})
    .then(subs => res.render('browse', {allSubs: subs, isLogin: req.isAuthenticated()}))
    .catch(console.error)
})

//UserPost Index
router.get('/all', (req, res) => {
    UserPost.find({})
    .populate('subPage')
    .sort({updatedAt: 'desc'})
    .then(posts => 
        res.render('all', {allPosts : posts, isLogin: req.isAuthenticated()}))
    .catch(console.error)
})

//Create subPage
router.get('/all/browse', (req, res) => {
    res.render('createSub', {subPage: false, isLogin: req.isAuthenticated()})
})

//show subPage
router.get('/:subPage', (req, res) => {
    if (consoleToggle) {console.log(`hit ${req.params.subPage} get`)}
    SubPage.findOne({title: req.params.subPage})
    .populate('posts')
    .then(sub => {
        let status = req.isAuthenticated()
        res.render('subPage', {
            subPage : sub,
            posts: sub.posts,
            isLogin: status,
            mod: (status) ? checkMod(sub, req) : false
        })
    })
    .catch(console.error)
})

//edit subPage
router.get('/:subPage/edit', (req, res) => {
    SubPage.findOne({title: req.params.subPage})
    .populate('posts')
    .then(sub => {
        let status = req.isAuthenticated()
        let isMod = false
        if (status) {
            isMod = checkMod(sub, req)
        }
        if (isMod) {
            res.render('createSub', {
                subPage: sub,
                isLogin: status,
                mod: isMod
        })} else {
            res.redirect('/r/'+ sub.title)
        }
})
    .catch(console.error)
})

router.post('/all/subPage', (req, res) => {
    SubPage.create(req.body)
    .then(sub => res.redirect('/r/'+ sub.title))
    .catch(console.error)
})

router.put('/:subPage', (req, res) => {
    SubPage.findOneAndUpdate({title: req.params.subPage}, req.body)
    .then(sub => res.redirect('/r/'+ sub.title))
    .catch(console.error)
})

router.delete('/:subPage', (req, res) => {
    SubPage.findOneAndDelete({title: req.params.subPage})    
    .then(() => res.redirect('/r/all'))
    .catch(console.error)
})

module.exports = router