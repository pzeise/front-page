const UserPost = require('../models/userPost-model')
const postSeedData = require('./userPost-seeds.json')

UserPost.deleteMany({})
    .then(() => UserPost.create(postSeedData))
    .then(console.log(`Entered ${postSeedData.length} UserPosts`))  
    .catch(console.error)
    .finally(() => process.exit())