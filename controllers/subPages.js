const express = require('express')
const router = express.Router()
const SubPage = require('../models/subPage-model')
const UserPost = require('../models/userPost-model')

const consoleToggle = Boolean(process.env.DEV_CONSOLE_IS_ON)

//SubPage Index
router.get('/', (req, res) => {
    SubPage.find({})
    .then(subs => res.send(subs))
    .catch(console.error)
})

//UserPost Index
router.get('/all', (req, res) => {
    UserPost.find({})
    .populate('subPage')
    .then(posts => res.render('all', {allPosts : posts}))
    .catch(console.error)
})

router.get('/:subPage', (req, res) => {
    if (consoleToggle) {console.log(`hit ${req.params.subPage} get`)}
    SubPage.findOne({title: req.params.subPage})
    .populate('posts')
    .then(sub => res.render('subPage', {subPage : sub, posts: sub.posts}))
    .catch(console.error)
})

router.post('/', (req, res) => {
    SubPage.create(req.body)
    .then(sub => res.send(sub))
    .catch(console.error)
})

router.put('/:subPage', (req, res) => {
    SubPage.findOneAndUpdate({title: req.params.subPage}, req.body)
    .then(sub => res.send(sub))
    .catch(console.error)
})

router.delete('/:subPage', (req, res) => {
    SubPage.findOne({title: req.params.subPage})
    .then(sub => UserPost.deleteMany({subPage: sub}))
    .then(() => SubPage.findOneAndDelete({title: req.params.subPage}))    
    .catch(console.error)
})

module.exports = router