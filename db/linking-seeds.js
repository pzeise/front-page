const SubPage = require('../models/subPage-model')
const UserPost = require('../models/userPost-model')
let pageIndex = []

SubPage.find({})
    .then(pages => {
        pageIndex = pages
        console.log(pageIndex)})
    .then(() => {
        UserPost.find({})
        .then(posts => {
            console.log(posts)
            for(let i = 0; i < posts.length; i++) {
                if (i<3) {
                    posts[i].subPage = pages[0]._id
                    pages[0].posts.push(posts[i]._id)
                    console.log(`adding a ${pages[0].posts.length} item to ${pages[0].title}`)
                }
                else if (i<6) {
                    posts[i].subPage = pages[1]._id
                    pages[1].posts.push(posts[i]._id)
                }
                else {
                    posts[i].subPage = pages[2]._id
                    pages[2].posts.push(posts[i]._id)
                }
            }
            console.log(posts)
            console.log(pageIndex)
        })
        .catch(console.error)        
    })
    .catch(console.error)
    .finally(() => process.exit())