const express = require('express')
const Report = require('../models/reportModel')
const { 
    getReports,
    getReport,
    createReport,
    deleteReport,
    updateReport
 } = require('../controllers/reportController')

const router = express.Router()

// GET all reports
router.get('/', getReports)

// GET a single report
router.get('/:id', getReport)

// POST a new report
router.post('/', createReport)

// DELETE a report
router.delete('/:id', deleteReport)

// UPDATE a report
router.patch('/:id', updateReport)

// express server
module.exports = router
