const Report = require('../models/reportModel')
const mongoose = require('mongoose')

// get all reports
const getReports = async(req, res) => {
    const reports = await Report.find({}).sort({ createdAt: -1 })

    res.status(200).json(reports)
}

// get a single report
const getReport = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No report found'})
    }

    const report = await Report.findById(id)

    if (!report) {
        return res.status(404).json({error: 'No report found'})
    }

    res.status(200).json(report)
}

// create a new report
const createReport = async(req, res) => {
    const { url, uploadedAt, userID, validated } = req.body

    // add doc to db
    try {
        const report = await Report.create({ url, uploadedAt, userID, validated })
        res.status(200).json(report)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a Report
const deleteReport = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No report found'})
    }

    const report = await Report.findOneAndDelete({ _id: id })

    if (!report) {
        return res.status(404).json({error: 'No Report found'})
    }

    res.status(200).json(report)
}

// update a Report
const updateReport = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No report found'})
    }

    const report = await Report.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!report) {
        return res.status(404).json({error: 'No report found'})
    }

    res.status(200).json(report)
}

module.exports = {
    getReports,
    getReport,
    createReport,
    deleteReport,
    updateReport
}