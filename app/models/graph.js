const mongoose = require('mongoose')
const Schema = mongoose.Schema

const graphSchema = new Schema({
    province: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Graph', graphSchema)
