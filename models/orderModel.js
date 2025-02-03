const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    vehicleId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    trackId: {
      type: String,
      unique: true,
      required: true,
      default: () => uuidv4(),
    },
    pickupAddress: {
      pickupContact: String,
      door: String,
      city: String,
      street: String,
      state: String,
      landmark: String,
      pincode: String,
      location: {
        lat: String,
        long: String,
      },
    },
    deliveryAddress: [
      {
        deliveryContact: String,
        door: String,
        city: String,
        street: String,
        state: String,
        landmark: String,
        pincode: String,
        location: {
          lat: String,
          long: String,
        },
      },
    ],
    packageDetails: {
      type: String,
      weight: Number,
      dimensions: String,
      description: String,
    },
    status: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
