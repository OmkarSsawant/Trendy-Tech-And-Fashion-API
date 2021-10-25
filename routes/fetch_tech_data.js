const router = require('express').Router()
const { default: axios } = require('axios')
const { routeToUrl } = require('./route_to_url')
const TechArticleSchema = require('../data/article');
const mongoose = require('mongoose');



router.get('/:category', async (req, res) => {
    console.time(req.params.category + " Updation Duration @ ")
    const { category } = req.params
    let { page } = req.query
    page = parseInt(page) || 1
    console.log(page);
    const apiUrl = routeToUrl(category, page)
    console.log("Made Request To", apiUrl);
    try {
        const apiRes = await axios.get(apiUrl)
        // console.log(apiRes.data.data)
        const TechArticle = mongoose.model(category, TechArticleSchema)

        if (page == 1) {
            let firstDoc = await TechArticle.collection.findOne({})
            if (firstDoc.title == apiRes.data.data[0].title) {
                //API is not updated 
                res.end("<h1> API is Upto-Date </h1>")
                return
            }
            await TechArticle.collection.deleteMany({})

        } if (apiRes.data.pagination.count != 0)
            await TechArticle.collection.insertMany(apiRes.data.data, {
                ordered: true
            })
        else
            res.end("Done!")
        res.send(`<center> <h1> Updated/Intilized  ${req.params.category} on Server </h1> </center>`)
    } catch (e) {
        console.log("THERE ERORRRRRRRRRR");
        console.error(e);
        res.status(500)
        res.json({ error: e })
    }
    console.timeEnd(req.params.category + "Updation Duration @ ")
})

module.exports = router