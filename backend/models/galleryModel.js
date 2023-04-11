const mongoose = require('mongoose')
const schema = mongoose.Schema

const gallerySchema = new schema({
    labels : {
        type: String,
        require: [true, 'label is required']
    },
    url : {
        type: String,
        require: [true, 'url is required']
    }
})

const gallery = mongoose.model('gallery', gallerySchema)
module.exports = gallery