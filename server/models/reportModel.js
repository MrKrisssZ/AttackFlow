const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reportSchema = new Schema({
    filename: {
        type: String,
        required: true,
    },
    uploadedAt:{
        type: Date,
        default: Date.now,
    },
    userID: {
        type: String,
        required: true
    }
}, { 
    timestamps: true
})

module.exports = mongoose.model('Report', reportSchema)