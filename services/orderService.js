const { default: mongoose } = require('mongoose');
const Order = require('../models/orderModel');


const createOrder = async (orderData) => {
  try {
    const order = new Order(orderData);
    const result = await order.save()
    return { success: true, data: result }
  } catch (err) {
    return { success: false, message: err.message }
  }
};

const getAllOrders = async (req) => {
  try {
    const { query } = req;

    // Pagination defaults
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const matchFilters = {};

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
      matchFilters.status = query.status
      if (query.status === "all") {
        delete matchFilters.status;
      }
    }
    // Search filter
    let searchFilters = {}
    if (query.value) {
      searchFilters.$or = [
        { 'driver.name': { $regex: query.value, $options: 'i' } },
        { 'customer.name': { $regex: query.value, $options: 'i' } },
      ];
    }

    const pipeline = [
      { $match: matchFilters },
      {
        $lookup: {
          from: 'users',
          localField: 'customerId',
          foreignField: '_id',
          as: 'customer',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'driverId',
          foreignField: '_id',
          as: 'driver',
        },
      },
      { $unwind: { path: '$customer', preserveNullAndEmptyArrays: true } },
      { $unwind: { path: '$driver', preserveNullAndEmptyArrays: true } },
      { $match: searchFilters },
      { $skip: skip },
      { $limit: limit },
    ];

    const result = await Order.aggregate(pipeline);

    // Total count for pagination
    const totalCount = await Order.countDocuments(matchFilters);

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


const getOrderById = async (id) => {
  try {
    let matchFilters = {}
    matchFilters._id = new mongoose.Types.ObjectId(id)
    const pipeline = [
      { $match: matchFilters },
      {
        $lookup: {
          from: 'users',
          localField: 'customerId',
          foreignField: '_id',
          as: 'customer',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'driverId',
          foreignField: '_id',
          as: 'driver',
        },
      },
      { $unwind: { path: '$customer', preserveNullAndEmptyArrays: true } },
      { $unwind: { path: '$driver', preserveNullAndEmptyArrays: true } },
    ];

    const result = await Order.aggregate(pipeline);
    return { success: true, data: result }
  } catch (err) {
    return { success: false, message: err.message }
  }
};


const getCustomerOrderHistory = async (customerId) => {
  try {
    const result = await Order.find({ customerId }).sort({ createdAt: -1 });
    return { success: true, data: result }
  } catch (err) {
    return { success: false, message: err.message }
  }
};


const getDriverOrderHistory = async (driverId) => {
  try {
    const result = await Order.find({ driverId }).sort({ createdAt: -1 });
    return { success: true, data: result }
  } catch (err) {
    return { success: false, message: err.message }
  }
};

const updateOrderById = async (id, orderData) => {
  try {
    const result = await Order.findByIdAndUpdate(id, orderData, { new: true });
    return { success: true, data: result }
  } catch (err) {
    return { success: false, message: err.message }
  }
};




module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getCustomerOrderHistory,
  getDriverOrderHistory,
  updateOrderById
};
