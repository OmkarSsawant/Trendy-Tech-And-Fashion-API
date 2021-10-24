const express = require('express')
const api = require('./routes/api')
const app = express()
const TECH_MONGO_URI = "mongodb+srv://omkar-sawant:Ewn9vwJ5DUnnK4LG@cluster0.iyx7h.mongodb.net/tech?retryWrites=true&w=majority";

const mongoose = require('mongoose')
mongoose.connect(TECH_MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(_ => console.log("Connted DB 💿"))
app.use("/api", api)

app.listen(8000, () => console.log("Re/Started Server @" + Date.now()))