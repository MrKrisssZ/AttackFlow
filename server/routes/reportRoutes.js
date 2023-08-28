const express = require('express')
const {
    getReports,
    getReport,
    createReport,
    deleteReport,
    updateReport
} = require('../controllers/reportController')

const router = express.Router()

// GET all data
router.get('/', getReports)

// GET a single data
router.get('/:id', getReport)

// POST a new data
router.post('/', createReport)

// DELETE a new data
router.delete('/:id', deleteReport)

// UPDATE a new data
router.patch('/:id', updateReport)

module.exports = router