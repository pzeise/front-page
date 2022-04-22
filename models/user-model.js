const mongoose = require('../db/connection')
const ObjectId = mongoose.Schema.Types.ObjectId
const validator = require('validator')

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique:true,
            index: { collation: {locale: 'en', strength:2 }}
        },
        posts: [{type: ObjectId, ref: 'UserPost'}],
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
            validate: [validator.isEmail, 'invalid email']
        },
        googleId: String
    },
    {timestamps: true}
)

const User = mongoose.model('User', UserSchema)
module.exports = User