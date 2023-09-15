// models
const Annotation = require('../models/annotationModel')
// const AttackFlow = require('../models/attackFlowModel')
// const AttackAction = require('../models/attackActionModel')
// const AttackAsset = require('../models/attackAssetModel')
// const AttackCondition = require('../models/attackConditionModel')
// const AttackOperator = require('../models/attackOperatorModel')

const mongoose = require('mongoose')

// create a new annotation
const createAnnotation = async(req, res) => {
    const { userID, objects } = req.body

    try {
        const annotation = await Annotation.create({ userID, objects })
        res.status(200).json(annotation)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// update an annotation
const updateAnnotation = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No annotation found'})
    }

    const annotation = await Annotation.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!annotation) {
        return res.status(404).json({error: 'No annotation found'})
    }

    res.status(200).json(report)
}

module.exports = {
    createAnnotation,
    updateAnnotation
}