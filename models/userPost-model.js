const mongoose = require('../db/connection')
const ObjectId = mongoose.Schema.Types.ObjectId
const SubPage = require('./subPage-model')

const UserPostSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: String,
        shortDescription: String,
        img: String,
        subPage: {type: ObjectId, ref: 'SubPage'}
        //Stretch Goals
        //author: {type: ObjectId, ref: PageUser},
        //votes: [{type: ObjectId, ref: UserVote}]
    },
    {timestamps: true}
)


UserPostSchema.post('findByIdAndDelete', async function(doc) {
    console.log(doc)
    if (doc) {
        const didItWork = await SubPage.findOneAndUpdate({title: doc.subPage.title}, {$pullAll:{posts: [{_id: doc._id}]}})
        console.log("Post delete results: ", didItWork)
    }
})

const UserPost = mongoose.model('UserPost', UserPostSchema)
module.exports = UserPost