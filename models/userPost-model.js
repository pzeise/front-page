const mongoose = require('../db/connection')
const ObjectId = mongoose.Schema.Types.ObjectId

const UserPostSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: String,
        img: String,
        subPage: {type: ObjectId, ref: 'SubPage'}
        //Stretch Goals
        //author: {type: ObjectId, ref: PageUser},
        //votes: [{type: ObjectId, ref: UserVote}]
    },
    {timestamps: true}
)

const UserPost = mongoose.model('UserPost', UserPostSchema)
module.exports = UserPost