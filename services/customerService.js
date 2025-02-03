const User = require('../models/userModel')


exports.getAllCustomer = async (req) => {
  try {
    const { query } = req;

    // Pagination defaults
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const matchFilters = {};
    matchFilters.role = 'customer';

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


exports.getCustomerById = async (id) => {
  try {
    const result = await User.findById(id).exec()
    return { success: true, data: result }
  }
  catch (err) {
    return { success: false, message: err.message }
  }
}

exports.updateCustomerById = async (id, reqBody) => {
  try {
    const result = await User.findByIdAndUpdate(id, reqBody, { new: true }).exec()
    return { success: true, data: result }
  }
  catch (err) {
    return { success: false, message: err.message }
  }
}

exports.blockCustomerById = async (id) => {
  try {
    const result = await User.findByIdAndUpdate(id, { $set: { isBlocked: true } }, { new: true }).exec()
    return { success: true, data: result }
  }
  catch (err) {
    return { success: false, message: err.message }
  }
}

exports.unBlockCustomerById = async (id) => {
  try {
    const result = await User.findByIdAndUpdate(id, { $set: { isBlocked: false } }, { new: true }).exec()
    return { success: true, data: result }
  }
  catch (err) {
    return { success: false, message: err.message }
  }
}

exports.deactivateCustomerById = async (id) => {
  try {
    const result = await User.findByIdAndUpdate(id, { $set: { status: false } }, { new: true }).exec()
    return { success: true, data: result }
  }
  catch (err) {
    return { success: false, message: err.message }
  }
}