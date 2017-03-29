const mongoose = require('mongoose')
const Schema = mongoose.Schema

const formSchema = new Schema({
    city: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    crop_type: {
        type: String,
        enum: ['grains', 'vegetables', 'fruit', 'other'],
        required: true
    },
    crop_kind: {
        type: String,
        required: true
    },
    total_acres: {
        type: Number,
        required: true
    },
    acre_irrigation: {
        type: Number,
        required: true
    },
    rainfall_PastYr: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at'
    }
})

module.exports = mongoose.model('Form', formSchema)
