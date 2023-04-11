const express = require('express')
const mongoose = require('mongoose')
const galleryRouter = require('./routes/gallery-routes')
require('dotenv').config()

const app = express()
app.use(require('cors')())
app.use(express.json())
app.use('/', galleryRouter)


const PORT = 8000
const database = process.env.database

mongoose.connect(database,{ useNewUrlParser: true, useUnifiedTopology: true } )
                .then(()=> {console.log("connected to database")})
                .catch((err)=>{console.log(err);})

app.listen(PORT,()=>{
    console.log(`app is listening on ${PORT}`)
})               