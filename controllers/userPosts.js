const express = require('express')
const router = express.Router()

const SubPage = require('../models/subPage-model')
const UserPost = require('../models/userPost-model')

//create a post
router.get('/:subPage/post', (req, res) => {
    SubPage.find({})
    .then(subs => {
        res.render('post', {subList: subs, post: false, currentSub: subs.find(sub => sub.title === req.params.subPage)})})
    .catch(console.error)
})
//view a post
router.get('/:subPage/:id', (req, res) => {
    UserPost.findById(req.params.id)
    .populate('subPage')
    .then(post => res.render('viewPost', {post: post}))
    .catch(console.error)
})

router.get('/:subPage/:id/edit', (req, res) => {
    UserPost.findById(req.params.id)
    .populate('subPage')
    .then(post => {
        res.render('post', {subList: [post.subPage], currentSub: post.subPage, post: post})})
    .catch(console.error)
})

router.post('/all/post', (req, res) => {
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
    UserPost.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        img: req.body.img
    })
    .then(post => res.redirect('/r/' + req.params.subPage + '/' + post._id))
    .catch(console.error)
})

router.delete('/:subPage/:id', (req, res) => {
    UserPost.findByIdAndDelete()
    SubPage.findOneAndUpdate({title: req.params.subPage}, {$pullAll:{posts: [{_id: req.params.id}]}})
    .catch(console.error)
})

module.exports = router