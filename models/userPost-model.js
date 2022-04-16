const mongoose = require('../db/connection')

const UserPostSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: String,
        img: String,
        //Stretch Goals
        //author: PageUser,
        //votes: [{type: UserVotes}]
    },
    {timestamps: true}
)

const UserPost = mongoose.model('UserPost', UserPostSchema)
module.exports = UserPost