const Vehicle = require('../models/vehicleModel')
const VehicleTimeslot = require('../models/vehicletimeslotModel')
const mongoose = require('mongoose')

exports.createVehicle = async (vehicleData, imageUrl) => {
  try {
    if (imageUrl) {
      vehicleData.image = imageUrl;
    }

    const vehicle = new Vehicle(vehicleData);
    const result = await vehicle.save();
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
};


exports.getAllVehicles = async () => {
  try {
    const result = await Vehicle.find().exec();
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
};


exports.getAllAvailableVehicles = async () => {
  try {
    const result = await Vehicle.find({ status: true }).exec();
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

exports.getVehicleById = async (id) => {
  try {
    const result = await Vehicle.findById(id).exec()
    return { success: true, data: result }
  }
  catch (err) {
    return { success: false, message: err.message }
  }
}



exports.createVehicleTimeslot = async (timeslotData) => {
  try {
    const timeslot = new VehicleTimeslot(timeslotData);
    const result = await timeslot.save();
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

exports.getAllVehicleTimeslots = async () => {
  try {
    const result = await Vehicle.aggregate([
      {
        $lookup: {
          from: 'vehicletimeslots',
          localField: '_id',
          foreignField: 'vehicleId',
          as: 'timeslots',
        },
      },

    ]).exec();
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
};



exports.getVehicleTimeslotById = async (vehicleId) => {
  try {
    const result = await Vehicle.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(vehicleId) },
      },
      {
        $lookup: {
          from: 'vehicletimeslots',
          localField: '_id',
          foreignField: 'vehicleId',
          as: 'timeslots',
        },
      },

    ]).exec();
    return { success: true, data: result[0] };
  }
  catch (err) {
    return { success: false, message: err.message };

  }

};

exports.UpdateVehicleById = async (id, vehicleData, imageUrl) => {
  try {
    if (imageUrl) {
      vehicleData.image = imageUrl.path;
    }

    const result = await Vehicle.findByIdAndUpdate(
      id,
      vehicleData,
      { new: true }
    );
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

exports.deleteVehicleById = async (vehicleId) => {
  try {
    const vehicleWithTimeslots = await Vehicle.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(vehicleId) },
      },
      {
        $lookup: {
          from: 'vehicletimeslots',
          localField: '_id',
          foreignField: 'vehicleId',
          as: 'timeslots',
        },
      },
    ]);

    if (!vehicleWithTimeslots || vehicleWithTimeslots.length === 0) {
      return { success: false, message: 'Vehicle not found.' };
    }


    await VehicleTimeslot.deleteMany({ vehicleId: new mongoose.Types.ObjectId(vehicleId) });


    const result=await Vehicle.findByIdAndDelete(vehicleId);
    if(!result){
      return { success: false, message: 'Vehicle not found.', data: { id: vehicleId } };
    }

    return { success: true, message: 'Vehicle and associated timeslots deleted successfully.', data:result };
  } catch (err) {
    return { success: false, message: err.message };
  }
};



exports.deleteVehicleTimeslotById = async (vehicleTimeslotId) => {
  try {

    let result = await VehicleTimeslot.findByIdAndDelete(vehicleTimeslotId);
    if (!result) {
      return { success: false, message: 'Vehicle timeslots not found.', data: { id: vehicleTimeslotId } };
    }
    return { success: true, message: 'Vehicle timeslots deleted successfully.', data: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
};
