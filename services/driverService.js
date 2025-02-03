const User = require('../models/userModel');
const DriverDetails = require('../models/driverModel');
const {validateVehicleNoFormat,isVehicleNoUnique,} = require('../validation/vehicleValidator')
const mongoose = require('mongoose');



const createDriver = async (userId, driverData, files) => {
  try {
    const { vehicleNo } = driverData;

    // Step 1: Validate vehicle number format
    if (!validateVehicleNoFormat(vehicleNo)) {
      return { success: false, message: "Invalid vehicle number format" };
    }

    // Step 2: Check if vehicle number is unique
    const isUnique = await isVehicleNoUnique(vehicleNo, DriverDetails);
    if (!isUnique) {
      return { success: false, message: "Vehicle number already exists" };
    }

    // Proceed to save the driver details
    const driverDetails = new DriverDetails({
      userId,
      vehicleType: driverData.vehicleType,
      vehicleNo,
      licenseDoc: {
        frontUrl: files.licenseFront ? files.licenseFront[0]?.path : null,
        backUrl: files.licenseBack ? files.licenseBack[0]?.path : null,
      },
      rcbookUrl: files.rcbook ? files.rcbook[0]?.path : null,
      aadharUrl: files.aadhar ? files.aadhar[0]?.path : null,
      panUrl: files.pan ? files.pan[0]?.path : null,
      driverSelfieUrl: files.driverSelfie ? files.driverSelfie[0]?.path : null,
      vehicleInsuranceUrl: files.vehicleInsurance ? files.vehicleInsurance[0]?.path : null,
    });

    const savedDriverDetails = await driverDetails.save();
    return { success: true, data: savedDriverDetails };
  } catch (err) {
    return { success: false, message: err.message };
  }
};


// const getDriverDetails = async (req) => {
//   try {
//     const { query } = req;
    
//     // Pagination defaults
//     const page = parseInt(query.page, 10) || 1;
//     const limit = parseInt(query.limit, 10) || 10;
//     const skip = (page - 1) * limit;

//     const matchFilters = {};
//     matchFilters.role = 'driver'
//     // Date filter
//     if (query.startDate || query.endDate) {
//       const startDate = query.startDate ? new Date(query.startDate) : null;
//       const endDate = query.endDate ? new Date(query.endDate) : null;

//       matchFilters.createdAt = {};
//       if (startDate) matchFilters.createdAt.$gte = startDate;
//       if (endDate) matchFilters.createdAt.$lte = endDate;
//     }

//     // Status filter
//     if (query.status) {
//       matchFilters.isBlocked = query.status === 'active' ? false : true;
//     }

//     // Search filter
//     if (query.value) {
//       matchFilters.name ={ $regex: query.value, $options: 'i' } 
//     }
    
//     const pipeline = [
//       { $match: matchFilters },
//       { $skip: skip },
//       { $limit: limit },
//     ];

//     const result = await User.aggregate(pipeline);

//     // Total count for pagination
//     const totalCount = await User.countDocuments(matchFilters);

//     return {
//       success: true,
//       data: result,
//       pagination: {
//         totalCount,
//         currentPage: page,
//         totalPages: Math.ceil(totalCount / limit),
//         pageSize: limit,
//       },
//     };
//   } catch (err) {
//     return { success: false, message: `Error: ${err.message}` };
//   }
// };

const getDriverDetails = async (req) => {
  try {
    const { query } = req;

    // Pagination defaults
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const matchFilters = {};
    matchFilters.role = 'driver';

    // Date filter
    if (query.startDate || query.endDate) {
      const startDate = query.startDate ? new Date(query.startDate).setHours(0, 0, 0, 0) : null; // Start at 00:00:00
      const endDate = query.endDate ? new Date(query.endDate).setHours(23, 59, 59, 999) : null; // End at 23:59:59.999
      matchFilters.createdAt = {};

      if (startDate) matchFilters.createdAt.$gte = new Date(startDate);
      if (endDate) matchFilters.createdAt.$lte = new Date(endDate);
    }

    // Status filter
    if (query.status) {
      if (query.status === 'active') {
        matchFilters.isBlocked = false;
      } else if (query.status === 'inActive') {
        matchFilters.isBlocked = true;
      } else if (query.status === 'all') {
        delete matchFilters.isBlocked;
      } else {
        return { success: false, message: 'Invalid query value' };
      }
    }

    if (query.value) {
      matchFilters.$or = [
        { name: { $regex: query.value, $options: 'i' } },
        { mobile: { $regex: query.value, $options: 'i' } },
        { email: { $regex: query.value, $options: 'i' } }
      ];
    }

    const pipeline = [
      { $match: matchFilters },
      { $skip: skip },
      { $limit: limit },
    ];

    const result = await User.aggregate(pipeline);

    // Total count for pagination
    const totalCount = await User.countDocuments(matchFilters);

    return {
      success: true,
      data: result,
      pagination: {
        totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        pageSize: limit,
      },
    };
  } catch (err) {
    return { success: false, message: `Error: ${err.message}` };
  }
};


const getDriverById = async (userId) => {
  try {
    const result = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: 'driverdetails',
          localField: '_id',
          foreignField: 'userId',
          as: 'driverDetails',
        },
      },
      {
        $unwind: {
          path: '$driverDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]).exec();
    return { success: true, data: result[0] };
  }
  catch (err) {
    return { success: false, message: err.message };

  }

};

const updateDriverDetails = async (id, updatedData, files) => {
    
  try {

    const { vehicleNo } = updatedData;

    if (vehicleNo) {
      // Step 1: Validate vehicle number format
      if (!validateVehicleNoFormat(vehicleNo)) {
        return { success: false, message: "Invalid vehicle number format" };
      }

      // Step 2: Check if vehicle number is unique
      const isUnique = await isVehicleNoUnique(vehicleNo, DriverDetails);
      if (!isUnique) {
        return { success: false, message: "Vehicle number already exists" };
      }
    }
    const existingDriverDetails = await DriverDetails.findOne({ userId: new mongoose.Types.ObjectId(id) });
    if (!existingDriverDetails) {
      return { success: false, message: "Driver details not found" };
    }

    const updatedDriverData = {
      vehicleType: updatedData.vehicleType || existingDriverDetails.vehicleType,
      vehicleNo: updatedData.vehicleNo || existingDriverDetails.vehicleNo,
      licenseDoc: {
        frontUrl: files.licenseFront ? files.licenseFront[0]?.path : existingDriverDetails.licenseDoc.frontUrl,
        backUrl: files.licenseBack ? files.licenseBack[0]?.path : existingDriverDetails.licenseDoc.backUrl,
      },
      rcbookUrl: files.rcbook ? files.rcbook[0]?.path : existingDriverDetails.rcbookUrl,
      aadharUrl: files.aadhar ? files.aadhar[0]?.path : existingDriverDetails.aadharUrl,
      panUrl: files.pan ? files.pan[0]?.path : existingDriverDetails.panUrl,
      driverSelfieUrl: files.driverSelfie ? files.driverSelfie[0]?.path : existingDriverDetails.driverSelfieUrl,
      vehicleInsuranceUrl: files.vehicleInsurance ? files.vehicleInsurance[0]?.path : existingDriverDetails.vehicleInsuranceUrl,
    };

    const updatedDriverDetails = await DriverDetails.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(id) },
      updatedDriverData,
      { new: true }
    );

    if (!updatedDriverDetails) {
      return { success: false, message: "Update failed" };
    }

    return { success: true, data: updatedDriverDetails };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const blockDriverById = async (id) => {
  try {
    let result = await User.findByIdAndUpdate(id, { $set: { isBlocked: true } }, { new: true }).exec()
    return { success: true, data: result }
  }
  catch (err) {
    return { success: false, message: err.message }
  }
};

const unblockDriverById = async (id) => {
  try {
    let result = await User.findByIdAndUpdate(id, { $set: { isBlocked: false } }, { new: true }).exec()
    return { success: true, data: result }
  }
  catch (err) {
    return { success: false, message: err.message }
  }
};


const deactivateDriverById = async (id) => {
  try {
    let result = await User.findByIdAndUpdate(id, { $set: { status: false } }, { new: true }).exec()
    return { success: true, data: result }
  }
  catch (err) {
    return { success: false, message: err.message }
  }
};


const updateDriverById = async (id, reqBody) => {
  try {
    const result = await User.findByIdAndUpdate(id, reqBody, { new: true }).exec()
    return { success: true, data: result }
  }
  catch (err) {
    return { success: false, message: err.message }
  }
}

module.exports = {
  createDriver,
  getDriverById,
  getDriverDetails,
  updateDriverDetails,
  blockDriverById,
  unblockDriverById,
  deactivateDriverById,
  updateDriverById
};
