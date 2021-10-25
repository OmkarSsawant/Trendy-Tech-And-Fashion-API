const router = require('express').Router();
const apiDataFetcher = require('./fetch_tech_data')
const apiDataLoader = require('./load_tech_data')


router.get('/home', (req, res) => res.end("<center> <h1> <b> Welcome To  API <b></h1></center>"))

/***
 * `/intialize` gets the latest news data from MediaStackApi
 * and stores in mongodb-atlas
 * 
 * pagination is provided by page
 ***/
router.use('/intialize', apiDataFetcher)

/***
 * `/news` gets news in mongodb-atlas 
 * which gets page in query but fetches db 
 * as by offset
 * pagination is provided by page
 ***/
router.use('/news', apiDataLoader)


module.exports = router