const express = require('express')
const requireAuth = require ('../middleware/requireAuth')
const { createAnnotation, updateAnnotation } = require('../controllers/annotationController')
const router = express.Router()

// models
const Annotation = require('../models/annotationModel')
// const AttackFlow = require('../models/attackFlowModel')
// const AttackAction = require('../models/attackActionModel')
// const AttackAsset = require('../models/attackAssetModel')
// const AttackCondition = require('../models/attackConditionModel')
// const AttackOperator = require('../models/attackOperatorModel')

// requre auth for the annotation routes
// router.use(requireAuth)

// POST a new annotation form
router.post('/', createAnnotation)

// UPDATE an annotation form
router.post('/:id', updateAnnotation)

module.exports = router