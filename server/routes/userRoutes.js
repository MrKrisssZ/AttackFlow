const express = require('express')

// controller functions
const { loginUser, signupUser } = require('../controllers/userController')
// const { loginUser, signupUser, retrieveUserRole } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// retrieve user's role by userID
// router.get('/role', retrieveUserRole)

module.exports = router