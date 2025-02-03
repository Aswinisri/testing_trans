const vehicleService = require('../services/vehicleService')
const upload = require('../config/multer')

exports.createVehicle = async (req, res, next) => {
  try {
    const vehicleData = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: 'Image file is required.' });
    }

    const result = await vehicleService.createVehicle(vehicleData, file.path);
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }

    res.status(200).json({ success: true, data: result.data });
  } catch (err) {
    next(err);
  }
};

exports.getAllVehicles = async (req, res, next) => {
  try {
    const result = await vehicleService.getAllVehicles();
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(200).json({ success: true, data: result.data });
  } catch (err) {
    next(err);
  }
};

exports.getAllAvailableVehicles = async (req, res, next) => {
  try {
    const result = await vehicleService.getAllAvailableVehicles();
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(200).json({ success: true, data: result.data });
  } catch (err) {
    next(err);
  }
};

exports.getVehicleById = async (req, res, next) => {
  try {

    const vehicleId = req.params.id;
    const result = await vehicleService.getVehicleById(vehicleId);
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(200).json({ success: true, data: result.data });
  } catch (err) {
    next(err);
  }
};


exports.createVehicleTimeslot = async (req, res, next) => {
  try {
    const result = await vehicleService.createVehicleTimeslot(req.body);
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(200).json({ success: true, message: 'Vehicle timeslot created successfully', data: result.data });
  } catch (err) {
    next(err);
  }
};


exports.getAllVehicleTimeslots = async (req, res, next) => {
  try {
    const result = await vehicleService.getAllVehicleTimeslots();
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(200).json({ success: true, message: "Vehicle timeslots retrieved successfully", data: result.data });
  } catch (err) {
    next(err);
  }
};


exports.getVehicleTimeslotById = async (req, res, next) => {
  try {
    const vehicleId = req.params?.id;

    const result = await vehicleService.getVehicleTimeslotById(vehicleId);
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(200).json({ success: true, message: "Vehicle details retrieved successfully", data: result.data });
  } catch (err) {
    next(err);
  }
};


exports.UpdateVehicleById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const vehicleData = req.body;
    const file = req.file;

    const result = await vehicleService.UpdateVehicleById(id, vehicleData, file);
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }

    res.status(200).json({ success: true, data: result.data });
  } catch (err) {
    next(err);
  }
};


exports.deleteVehicleById = async (req, res, next) => {
  try {
    const vehicleId = req.params.id;

    const result = await vehicleService.deleteVehicleById(vehicleId);

    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }

    res.status(200).json({ success: true, data: result.data });
  } catch (err) {
    next(err);
  }
};

exports.deleteVehicleTimeSlotById = async (req, res, next) => {
  try {
    const vehicleTimeSlotId = req.params.id;

    const result = await vehicleService.deleteVehicleTimeslotById(vehicleTimeSlotId);

    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }

    res.status(200).json({ success: true, data: result.data });
  } catch (err) {
    next(err);
  }
};