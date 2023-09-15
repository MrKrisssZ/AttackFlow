const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const Schema = mongoose.Schema

// define externameReference schema
const externalReferenceSchema = new Schema({
    sourceName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
})

// create ExternalReference model
const ExternalReference = mongoose.model('ExternalReference',externalReferenceSchema)

// create attackFlow schema
const attackFlowSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
            default: 'attack-condition',
        },
        id: {
            type: String,
            required: true,
            unique: true,
            default: function() {
                const uniqueID = uuidv4();
                return 'attack-condition--' + uniqueID;
            },
        },
        specVersion: {
            type: Number,
            required: true,
            default: 2.1,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: { createdAt: 'createdAt', modifiedAt: 'modifiedAt' },
    }
)

module.exports = mongoose.model('AttackCondition', attackConditionSchema)