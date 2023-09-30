const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const Schema = mongoose.Schema

// create attackFlow schema
const attackOperatorSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
            default: 'attack-operator',
        },
        id: {
            type: String,
            required: true,
            unique: true,
            default: function() {
                const uniqueID = uuidv4();
                return 'attack-operator--' + uniqueID;
            },
        },
        specVersion: {
            type: Number,
            required: true,
            default: 2.1,
        },
        operator: { 
            type: String,
            required: true,
            enum: ['AND','OR'],
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

module.exports = mongoose.model('AttackOperator', attackOperatorSchema)