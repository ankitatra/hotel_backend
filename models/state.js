const mongoose = require('mongoose');

const { Schema } = mongoose;

const stateSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
  });

const State = mongoose.model('State', stateSchema);

module.exports = State;
