const mongoose = require('mongoose')

const vehicleTimeslotSchema =new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  timeslot: {
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    }
  },
  distance: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
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

module.exports = mongoose.model('VehicleTimeslot', vehicleTimeslotSchema);
