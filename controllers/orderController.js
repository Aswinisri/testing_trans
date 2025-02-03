const orderService = require('../services/orderService');



const createOrder = async (req, res, next) => {
  try {
    const orderData = req.body;
    let result = await orderService.createOrder(orderData);
    if (!result.success) {
      return res.status(400).json({ sucess: false, error_type: 'bad_request', message: result.message })
    }
    res.status(200).json({ status: true, message: "Order created successfully", data: result.data });
  } catch (err) {
    next(err)
  }
};


const getAllOrders = async (req, res, next) => {
  try {
    const result = await orderService.getAllOrders(req);
    if (!result.success) {
      return res.status(400).json({ sucess: false, error_type: 'bad_request', message: result.message })
    }
    res.status(200).json({ status: true, message: "Orders Retrieved successfully", data: result.data, pagination: result.pagination });
  } catch (err) {
    next(err)
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const id = req.params?.id
    const result = await orderService.getOrderById(id);
    if (!result.success) {
      return res.status(400).json({ sucess: false, error_type: 'bad_request', message: result.message })
    }
    res.status(200).json({ status: true, message: 'Order Retrieved successfully', data: result.data });
  } catch (err) {
    next(err)
  }


}

const getCustomerOrderHistory = async (req, res, next) => {
  try {
    const customerId = req.params?.id
    const result = await orderService.getCustomerOrderHistory(customerId);
    if (!result.success) {
      return res.status(400).json({ sucess: false, error_type: 'bad_request', message: result.message })
    }
    res.status(200).json({ status: true, message: 'Orders Retrieved successfully', data: result.data });
  } catch (err) {
    next(err)
  }
};

const getDriverOrderHistory = async (req, res, next) => {
  try {
    const driverId = req.params?.id
    const result = await orderService.getDriverOrderHistory(driverId);
    if (!result.success) {
      return res.status(400).json({ sucess: false, error_type: 'bad_request', message: result.message })
    }
    res.status(200).json({ status: true, message: 'Orders Retrieved successfully', data: result.data });
  } catch (err) {
    next(err)
  }
};


const updateOrderById = async (req, res, next) => {
  try {
    const id = req.params?.id
    const orderData = req.body;
    const result = await orderService.updateOrderById(id, orderData);
    if (!result.success) {
      return res.status(400).json({ sucess: false, error_type: 'bad_request', message: result.message })
    }
    res.status(200).json({ status: true, message: 'Order updated successfully', data: result.data });
  } catch (err) {
    next(err)
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
