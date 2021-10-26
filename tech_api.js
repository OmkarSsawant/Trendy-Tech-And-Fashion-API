const router = require('express').Router();
const apiDataFetcher = require('./routes/fetch_tech_data')
const apiDataLoader = require('./routes/load_tech_data')
const { default: axios } = require('axios');

router.get('/home', (req, res) => res.end("<center> <h1> <b> Welcome To  API <b></h1></center>"))


/***
 * `/intialize` gets the latest news data from MediaStackApi
 * and stores in mongodb-atlas
 * 
 * pagination is provided by page
 ***/
router.use('/intialize', apiDataFetcher)


async function fetchCategory(category, ...pages) {
    pages.forEach(async page => {
        const url = `http://localhost:8000/api/tech/intialize/${category}?page=${page}`
        await axios.get(url)
    })
}

router.get('/intialize-all', async (req, res) => {

    try {
        await fetchCategory('mobile', 1, 2)
        console.log("Fetched Mobile");
        await fetchCategory('laptop-pc', 1, 2)
        console.log("Fetched Laptop-PC");
        await fetchCategory('ai', 1, 2)
        console.log("Fetched ai");
        await fetchCategory('electronics', 1, 2)
        console.log("Fetched electronics");
        res.end("<h1> All News Data is Upto-date </h1>")
    } catch (e) {
        console.error(e);
        res.status(500)
        res.end(`<h1>Failed</h1> </b> <p>${JSON.stringify(e)} </p> </b> <a href="/intialize-all">retry</a>`)
    }
})



/***
 * `/news` gets news in mongodb-atlas 
 * which gets page in query but fetches db 
 * as by offset
 * pagination is provided by page
 ***/
router.use('/news', apiDataLoader)





module.exports = router