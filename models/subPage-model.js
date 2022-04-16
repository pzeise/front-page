const mongoose = require('../db/connection')
const ObjectId = mongoose.Schema.Types.ObjectId

const SubPageSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique: true},
        description: String,
        posts: [{type: ObjectId, ref: 'UserPost'}]
        //stretch goals
        //banner: String,
        //users: [{type: ObjectId, ref: PageUser}]
    },
    {timestamps: true}   
)

const SubPage = mongoose.model('SubPage', SubPageSchema)
module.exports = SubPage