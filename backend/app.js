const express = require('express')
const mongoose = require('mongoose')
const galleryRouter = require('./routes/gallery-routes')
require('dotenv').config()

const app = express()
app.use(require('cors')())
// app.use(express.json())
app.use(express.json({limit: '50mb'}));
//we are using limit , cause we are using base64 to save the image in string format
//but that string is large to save , so we increase the limit
app.use('/', galleryRouter)


const PORT = 8000
const database = process.env.database

mongoose.connect(database,{ useNewUrlParser: true, useUnifiedTopology: true } )
                .then(()=> {console.log("connected to database")})
                .catch((err)=>{console.log(err);})

app.listen(PORT,()=>{
    console.log(`app is listening on ${PORT}`)
})               