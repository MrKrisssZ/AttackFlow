const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const Schema = mongoose.Schema

// create attackAction schema
const attackActionSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
            default: 'attack-action',
        },
        id: {
            type: String,
            required: true,
            unique: true,
            default: function() {
                const uniqueID = uuidv4();
                return 'attack-action--' + uniqueID;
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
        tacticID: {
            type: String,
            // To-do: extract all tactic_id
            enum: [],
        },
        techniqueID: {
            type: String,
            // To-do: provide all available technique_id
            enum: [],
        },
        description: {
            type: String,
        },
        effectRef: [{ 
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return /^attack(action|condition|operator)/.test(value);
                },
                message: 'Identifier must starts with "attack-action" or "attack-condition" or "attack-operator"',
            },
        }],
    },
    {
        timestamps: { createdAt: 'createdAt', modifiedAt: 'modifiedAt' },
    }
)

module.exports = mongoose.model('AttackAction', attackActionSchema)