const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressSchema = new Schema({
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: {
            lat: Number,
            lng: Number
        }
    }
})

// define our address model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Address', addressSchema)
