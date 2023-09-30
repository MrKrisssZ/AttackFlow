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
            default: 'attack-flow',
        },
        id: {
            type: String,
            required: true,
            unique: true,
            default: function() {
                const uniqueID = uuidv4();
                return 'attack-flow--' + uniqueID;
            },
        },
        specVersion: {
            type: Number,
            required: true,
            default: 2.1,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        scope: { 
            type: String,
            required: true,
            enum: ['incident','campaign','threat-actor','malware','other'],
        },
        startRef: [{ 
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return /^attack(action|condition)/.test(value);
                },
                message: 'Identifier must starts with "attack-action" or "attack-condition"',
            },
        }],
        extRef: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ExternalReference',
        }],
    },
    {
        timestamps: { createdAt: 'createdAt', modifiedAt: 'modifiedAt' },
    }
)

module.exports = mongoose.model('AttackFlow', attackFlowSchema)