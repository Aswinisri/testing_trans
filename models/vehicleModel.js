const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  distance: {
    type: String,   
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  }
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);