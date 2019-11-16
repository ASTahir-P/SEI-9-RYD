const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

//Middlewares
app.use(bodyParser.json())
const postRoutes = require('./routes/posts')
app.use('/posts', postRoutes)

//Connect to the DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },()=> {
    console.log('connected to mongoDB')
})

app.listen(3000)