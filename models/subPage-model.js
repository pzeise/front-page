const mongoose = require('../db/connection')
const UserPost = require('./userPost-model')

const SubPageSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique: true},
        description: String,
        posts: [{type: UserPost}]
        //stretch goals
        //banner: String,
        //users: [type: PageUser]
    },
    {timestamps: true}   
)

const SubPage = mongoose.model('SubPage', SubPageSchema)
module.exports = SubPage