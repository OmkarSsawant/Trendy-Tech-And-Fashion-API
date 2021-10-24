const mongoose = require('mongoose')

const TechArticleSchema = new mongoose.Schema({
    author: String,
    category: String,
    country: String,
    description: String,
    image: String,
    language: String,
    published_at: String,
    source: String,
    title: String,
    url: String
})


module.exports = TechArticleSchema
