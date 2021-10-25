const router = require('express').Router()

const TechArticleSchema = require('../data/article');
const mongoose = require('mongoose');
const { default: axios } = require('axios');

router.get('/:category', async (req, res) => {
    const { category } = req.params
    let { page, limit } = req.query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 100
    const startOffset = Math.max(0, page - 1) * 100
    const TechArticle = mongoose.model(category, TechArticleSchema)
    var cur = TechArticle.collection.find({})
        .skip(startOffset)
        .limit(limit)
    var count = await cur.count()

    if (page < 5 && count == 0) {
        //More data could be loaded
        //current loadSize is 400 `page=1   -  page=4`
        const url = `http://localhost:8000/api/tech/intialize/${category}?page=${page}`
        await axios.get(url)
        cur.close()
        cur = TechArticle.collection.find({})
            .skip(startOffset)
            .limit(limit)
        count = await cur.count()
    }

    const endOfResults = count < 100
    const response = {
        pagination: {
            count,
            nextPage: endOfResults ? -1 : page + 1,
            prevPage: (page == 1) ? - 1 : page - 1,
            endOfResults
        },
        news: await cur.toArray()
    }
    res.json(response)
    cur.close()



})


module.exports = router