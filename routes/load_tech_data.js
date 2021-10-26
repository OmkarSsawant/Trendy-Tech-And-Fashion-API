const router = require('express').Router()

const TechArticleSchema = require('../data/article');
const mongoose = require('mongoose');
const { default: axios } = require('axios');
const API_PAGE_REQ_LIMIT = 7
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

    if (count == 0 && page < API_PAGE_REQ_LIMIT) {
        //More data could be loaded
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