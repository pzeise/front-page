const express = require('express')
const router = express.Router()

const SubPage = require('../models/subPage-model')
const UserPost = require('../models/userPost-model')


router.post('/:subPage', (req, res) => {
    SubPage.findOne({title: req.params.subPage})
    .then(sub => {
        return UserPost.create({
            title: req.body.title,
            description: req.body.description,
            img: req.body.img,
            subPage: sub//._id
        })
        .then(post => {
            sub.posts.push(post._id)
            sub.save()
            console.log(sub)
            res.send(post)
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