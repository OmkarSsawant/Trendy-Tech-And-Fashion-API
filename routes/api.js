const router = require('express').Router();
const { default: axios } = require('axios')
const { routeToUrl } = require('./route_to_url')
const TechArticleSchema = require('../data/article');
const mongoose = require('mongoose');

router.get('/home', (req, res) => res.end("<center> <h1> <b> Welcome To  API <b></h1></center>"))

router.get('/intialize/tech/:category', async (req, res) => {
    // console.time("Updation Duration @ ")
    const { category } = req.params
    const apiUrl = routeToUrl(category, req.query.page || 1)
    // console.log("Made Request To", apiUrl);
    try {
        const apiRes = await axios.get(apiUrl)
        // console.log(apiRes.data.data)
        const TechArticle = mongoose.model(category, TechArticleSchema)
        await TechArticle.collection.deleteMany({})
        await TechArticle.collection.insertMany(apiRes.data.data)

        res.send(`<center> <h1> Updated/Intilized  ${req.params.category} on Server </h1> </center>`)
    } catch (e) {
        console.log(e);
        console.log("THERE ERORRRRRRRRRR");
        // console.error(e);
        // res.status(500)
        // res.json({ error: e })
    }
    // console.timeEnd("Updation Duration @ ")
})




module.exports = router