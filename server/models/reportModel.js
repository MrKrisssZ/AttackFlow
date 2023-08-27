const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reportSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)