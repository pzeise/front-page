const SubPage = require('../models/subPage-model')
const UserPost = require('../models/userPost-model')
const postSeedData = require('./userPost-seeds.json')
const pageSeedData = require('./subPage-seeds.json')
const FileSystem = require('fs')
let pageIndex = []

SubPage.find({})
    .then(pages => {
        pageIndex = pages
        console.log(pageIndex)
    })
    .catch(console.error)


UserPost.find({})
    .then(posts => {
        console.log(posts)
        for(let i = 0; i < posts.length; i++) {
            if (i<3) {
                posts[i].subPage = pageIndex[0]._id
                pageIndex[0].posts.push(posts[i]._id)
                console.log(`adding a ${pageIndex[0].posts.length} item to ${pageIndex[0].title}`)
            }
            else if (i<6) {
                posts[i].subPage = pageIndex[1]._id
                pageIndex[1].posts.push(posts[i]._id)
            }
            else {
                posts[i].subPage = pageIndex[2]._id
                pageIndex[2].posts.push(posts[i]._id)
            }
        }
        console.log(posts)
        console.log(pageIndex)
        FileSystem.writeFile('newPages.json', JSON.stringify(pageIndex), err => console.error)
        FileSystem.writeFile('newPosts.json', JSON.stringify(posts), err => console.error)
    })
    .catch(console.error)