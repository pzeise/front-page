const SubPage = require('../models/subPage-model')
const pageSeedData = require('./subPage-seeds.json')
const newSeedData = require('./newPages.json')

SubPage.deleteMany({})
    .then(() => newSeedData ? SubPage.create(newSeedData) : SubPage.create(pageSeedData))
    .then(element => console.log(`Entered ${element.length} SubPages`))  
    .catch(console.error)
    .finally(() => process.exit())