const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reportSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    validated: {
        type: Boolean,
        default: false,
    }
}, 
// { timestamps: true }
{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
}
)

module.exports = mongoose.model('Report', reportSchema)