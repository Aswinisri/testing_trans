const driverService = require('../services/driverService');

const createDriverDetails = async (req, res, next) => {
  try {
    const driverData = req.body;
    const userId = req.user.id
    const result = await driverService.createDriver(userId, driverData, req.files);
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(201).json({ success: true, message: "Driver created successfully", data: result.data._id });
  } catch (err) {
    next(err);
  }
};

const getAllDrivers = async (req, res, next) => {
  try {
    const result = await driverService.getDriverDetails(req);
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    return res.status(200).json({ success: true, message: 'Drivers retrieved successfully.', data: result.data, pagination: result.pagination });
  } catch (err) {
    next(err)
  }
};

const getDriverById = async (req, res, next) => {
  try {
    const userId = req.params?.id;

    const result = await driverService.getDriverById(userId);
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(200).json({ success: true, message: "Driver details retrieved successfully", data: result.data });
  } catch (err) {
    next(err);
  }
};

const updateDriverDetails = async (req, res, next) => {
  const { id } = req.params;
  const driverDetails = req.body;
  const files = req.files;
  try {

    const result = await driverService.updateDriverDetails(id, driverDetails, files);
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    return res.status(200).json({ message: 'Driver details updated successfully', data: result.data });
  } catch (err) {
    next(err);
  }
};

const blockDriverById = async (req, res, next) => {
  try {
    const userId = req.params?.id;
    const result = await driverService.blockDriverById(userId);
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(200).json({ success: true, message: "Driver blocked successfully", data: result.data });
  } catch (err) {
    next(err);
  }
};

const unblockDriverById = async (req, res, next) => {
  try {
    const userId = req.params?.id;
    const result = await driverService.unblockDriverById(userId);
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(200).json({ success: true, message: "Driver unblocked successfully", data: result.data });
  } catch (err) {
    next(err);
  }
};

const deactivateDriverById = async (req, res, next) => {
  try {
    const userId = req.params?.id;
    const result = await driverService.deactivateDriverById(userId);
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(200).json({ success: true, message: "Driver deactivated successfully", data: result.data });
  } catch (err) {
    next(err);
  }
};

const updateDriverById = async (req, res, next) => {
  try {
    let driverId = req.params?.id
    const reqBody = req.body
    let result = await driverService.updateDriverById(driverId, reqBody)
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(200).json({ sucess: true, message: 'Customer details updated successfully.', data: result.data });
  }
  catch (err) {
    next(err)
  }
}


module.exports = {
  createDriverDetails,
  getAllDrivers,
  getDriverById,
  updateDriverDetails,
  blockDriverById,
  unblockDriverById,
  deactivateDriverById,
  updateDriverById
};
