const router = require('express').Router()

const TechArticleSchema = require('../data/article');
const mongoose = require('mongoose');

router.get('/:category', async (req, res) => {
    const { category } = req.params
    let { page, limit } = req.query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 100
    const startOffset = Math.max(0, page - 1) * 100
    const TechArticle = mongoose.model(category, TechArticleSchema)
    const cur = TechArticle.collection.find({})
        .skip(startOffset)
        .limit(limit)
    const count = await cur.count()
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