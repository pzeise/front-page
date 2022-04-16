const SubPage = require('../models/subPage-model')
const pageSeedData = require('./subPage-seeds.json')

SubPage.deleteMany({})
    .then(() => SubPage.create(pageSeedData))
    .then(console.log(`Entered ${pageSeedData.length} SubPages`))  
    .catch(console.error)
    .finally(() => process.exit())