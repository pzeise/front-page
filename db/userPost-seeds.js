const UserPost = require('../models/userPost-model')
const postSeedData = require('./userPost-seeds.json')
const newSeedData = require('./newPosts.json')

UserPost.deleteMany({})
    .then(() => newSeedData ? UserPost.create(newSeedData) : UserPost.create(postSeedData))
    .then(element => console.log(`Entered ${element.length} UserPosts`))  
    .catch(console.error)
    .finally(() => process.exit())