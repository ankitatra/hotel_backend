const mongoose = require('mongoose');

const { Schema } = mongoose;

const hotelsubfacilitySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    subFacilities: {
        type: [String],
        default: []
    }
});

const Hotelsubfacility = mongoose.model('Hotelsubfacility', hotelsubfacilitySchema);

module.exports = Hotelsubfacility;
