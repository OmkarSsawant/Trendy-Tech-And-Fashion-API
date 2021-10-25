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


async function fetchCategory(category) {
    for (let i = 1; i <= 4; i++) {
        const url = `http://localhost:8000/api/tech/intialize/${category}?page=${i}`
        await axios.get(url)
    }
}

router.get('/intialize-all', async (req, res) => {

    // res.send('<center><h1>Fetching Categories : Status</h1></center> <ul>')

    try {
        await fetchCategory('mobile')
        // res.send('<li> Fetched mobile </li>')
        console.log("Fetched Mobile");
        await fetchCategory('laptop-pc')
        // res.send('<li> Fetched laptop-pc </li>')
        console.log("Fetched Laptop-PC");

        await fetchCategory('hardware')
        // res.send('<li> Fetched hardware </li>')
        console.log("Fetched hardware");

        await fetchCategory('ai')
        // res.send('<li> Fetched ai </li>')
        console.log("Fetched ai");


        await fetchCategory('electronics')
        // res.send('<li> Fetched electronics </li>')
        console.log("Fetched electronics");

        // res.send("</ul>")

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