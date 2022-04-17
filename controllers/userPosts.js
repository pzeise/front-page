const express = require('express')
const router = express.Router()

const SubPage = require('../models/subPage-model')
const UserPost = require('../models/userPost-model')

router.get('/:subPage/:id', (req, res) => {
    UserPost.findById(req.params.id)
    .then(post => res.send(post))
    .catch(console.error)
})

router.post('/:subPage', (req, res) => {
    SubPage.findOne({title: req.params.subPage})
    .then(sub => {
        UserPost.create({
            title: req.body.title,
            description: req.body.description,
            img: req.body.img,
            subPage: sub._id
        })
        .then(post => {
            sub.posts.push(post._id)
            console.log(sub)
            // .then(() => {res.send(post, sub)})
            res.send(post, sub)
        })
        .catch(console.error)
    })
    .catch(console.error)
})

module.exports = router