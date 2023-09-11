const mongoose = require('mongoose')

const Schema = mongoose.Schema

const fileSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    pathInDrive: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: String,
        required: true
    },
    highlights: [{
        type: String,
    }],
    tags: [{
        type: String,
    }],
}, { timestamps: true })

module.exports = mongoose.model('File', fileSchema)
