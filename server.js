const express = require('express')
const api = require('./tech_api')
const app = express()
const TECH_MONGO_URI = "mongodb+srv://omkar-sawant:Ewn9vwJ5DUnnK4LG@cluster0.iyx7h.mongodb.net/tech?retryWrites=true&w=majority";

//TODO: integrate affiliate api here

const mongoose = require('mongoose')
mongoose.connect(TECH_MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(_ => console.log("Connted DB 💿"))
app.use("/api/tech", api)

app.listen(8000, () => console.log("Re/Started Server @" + Date.now()))