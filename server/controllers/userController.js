const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_TOKEN, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
    const { userID, password } = req.body

    try {
        const user = await User.login(userID, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({ userID, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// signup user
const signupUser = async (req, res) => {
    const { userID, password } = req.body

    try {
        const user = await User.signup(userID, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({ userID, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// retrieve user's role
// const retrieveUserRole = async (req, res) => {
//     const { userID } = req.query

//     try {
//         const user = await User.findOne({ userID })

//         if (!user) {
//             return res.status(400).json({ error: 'User not found' })
//         }

//         const {role } = user;
//         res.json({ role })
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// }

module.exports = { loginUser, signupUser }