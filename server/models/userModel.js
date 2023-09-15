const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, { timestamps: true })

// static signup method
userSchema.statics.signup = async function(userID, password) {

    // validation
    if (!userID || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ userID })
    if (exists) {
        throw Error('UserID already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ userID, password: hash, role: 'user' })

    return user
}

// static login method
userSchema.statics.login = async function(userID, password) {

    // validation
    if (!userID || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ userID })
    if (!user) {
        throw Error('Incorrect login credentials')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect login credentials')
    }
    return user
}

module.exports = mongoose.model('User', userSchema)