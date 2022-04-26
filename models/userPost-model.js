const mongoose = require('../db/connection')
const ObjectId = mongoose.Schema.Types.ObjectId
const SubPage = require('./subPage-model')

const UserPostSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, trim: true},
        description: String,
        shortDescription: String,
        img: String,
        subPage: {required: true, type: ObjectId, ref: 'SubPage'},
        author: {type: ObjectId, ref: 'User'},
        votes: [{type: ObjectId, ref: 'User'}]
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

//Create a post for create to add a short description to posts for preview

const UserPost = mongoose.model('UserPost', UserPostSchema)
module.exports = UserPost