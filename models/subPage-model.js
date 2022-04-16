const mongoose = require('../db/connection')
const UserPost = require('./userPost-model')
// const ObjectId = mongoose.SchemaType.ObjectId;

const SubPageSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique: true},
        description: String,
        posts: [{type: Object}]//Id, ref: UserPost}]
        //stretch goals
        //banner: String,
        //users: [{type: ObjectId, ref: PageUser}]
    },
    {timestamps: true}   
)

const SubPage = mongoose.model('SubPage', SubPageSchema)
module.exports = SubPage