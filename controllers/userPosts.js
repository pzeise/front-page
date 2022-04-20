const express = require('express')
const router = express.Router()

const SubPage = require('../models/subPage-model')
const UserPost = require('../models/userPost-model')


router.get('/:subPage/post', (req, res) => {
    SubPage.find({})
    .then(subs => {
        res.render('post', {subList: subs, currentSub: subs.find(sub => sub.title === req.params.subPage)})})
    .catch(console.error)
})
router.get('/:subPage/:id', (req, res) => {
    UserPost.findById(req.params.id)
    .populate('subPage')
    .then(post => res.render('viewPost', {post: post}))
    .catch(console.error)
})

router.post('/all', (req, res) => {
    console.log(req.body)
    SubPage.findOne({title: req.body.subPage})
    .then(sub => {
        return UserPost.create({
            title: req.body.title,
            description: req.body.description,
            img: req.body.img,
            subPage: sub
        })
        .then(post => {
            sub.posts.push(post)
            sub.save()
            console.log(sub)
            res.redirect('/r/' + sub.title + '/' + post._id)
        })
        .catch(console.error)
    })
    .catch(console.error)
})

router.put('/:subPage/:id', (req, res) => {
    UserPost.findByIdAndUpdate(req.params.id, req.body)
    .then(post => res.send(post))
    .catch(console.error)
})

router.delete('/:subPage/:id', (req, res) => {
    UserPost.findByIdAndDelete()
    SubPage.findOneAndUpdate({title: req.params.subPage}, {$pullAll:{posts: [{_id: req.params.id}]}})
    .catch(console.error)
})

module.exports = router