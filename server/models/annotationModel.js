const mongoose = require('mongoose')
// const { AttackFlow } = require('./attackFlowModel')
// const { AttackAction } = require('./attackActionModel')
// const { AttackCondition } = require('./attackConditionModel')
// const { AttackOperator } = require('./attackOperatorModel')
// const { AttackAsset } = require('./attackAssetModel')
const { v4: uuidv4 } = require('uuid')

const Schema = mongoose.Schema

const annotationSchema = new Schema(
    {
        userID: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            default: 'bundle',
        },
        id: {
            type: String,
            required: true,
            unique: true,
            default: function() {
                const uniqueID = uuidv4();
                return 'bundle--' + uniqueID;
            },
        },
        objects: [{
            type: Map,
            of: mongoose.Schema.Types.ObjectID,
            refPath: 'objectsType',
        }],
        objectsType: {
            type: String,
            enum: ['AttackFlow', 'AttackAction', 'AttackAsset', 'AttackCondition', 'AttackOperator'],
        },
        validated: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: { createdAt: 'createdAt', modifiedAt: 'modifiedAt' },
    }
)

module.exports = mongoose.model('Annotation', annotationSchema)