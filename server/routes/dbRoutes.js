const express = require('express')
const {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
} = require('../controllers/userController')
// const User = require('../models/userModel')
// const Report = require('../models/reportModel')

const router = express.Router()

// GET all data
router.get('/', getUsers)

// GET a single data
router.get('/:id', getUser)

// POST a new data
router.post('/', createUser)

// DELETE a new data
router.delete('/:id', deleteUser)

// UPDATE a new data
router.patch('/:id', updateUser)

module.exports = router