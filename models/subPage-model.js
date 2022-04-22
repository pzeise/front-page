const mongoose = require('../db/connection')
const ObjectId = mongoose.Schema.Types.ObjectId
const UserPost = require('./userPost-model')

const SubPageSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            unique:true,
            index: { collation: {locale: 'en', strength:2 }}
        },
        description: String,
        posts: [{type: ObjectId, ref: 'UserPost'}],
        banner: String
        //stretch goals
        //users: [{type: ObjectId, ref: PageUser}]
    },
    {timestamps: true}   
)

SubPageSchema.post('findOneAndDelete', async function(doc) {
    console.log(doc)
    if (doc) {
        const didItWork = await UserPost.deleteMany({subPage: doc._id})
        console.log("Post delete results: ", didItWork)
    }
})

const SubPage = mongoose.model('SubPage', SubPageSchema)
module.exports = SubPage