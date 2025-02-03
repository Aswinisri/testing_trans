

const customerService = require('../services/customerService')

exports.getAllCustomer = async (req, res, next) => {
  try {
    let result = await customerService.getAllCustomer(req)
    if (!result.success) {
      return res.status(400).json({ sucess: false, error_type: 'bad_request', message: result.message })
    }
    res.status(200).json({ sucess: true, message: 'Customer list retrieved successfully.', data: result.data, pagination: result.pagination });
  }
  catch (err) {
    next(err)
  }
}

exports.getCustomerById = async (req, res, next) => {
  try {
    let customerId = req.params?.id
    let result = await customerService.getCustomerById(customerId)
    if (!result.success) {
      return res.status(400).json({ sucess: false, error_type: 'bad_request', message: result.message })
    }
    res.status(200).json({ sucess: true, message: 'Customer details retrieved successfully.', data: result.data, });
  }
  catch (err) {
    next(err)
  }
}


exports.updateCustomerById = async (req, res, next) => {
  try {
    let customerId = req.params?.id
    const reqBody = req.body
    let result = await customerService.updateCustomerById(customerId, reqBody)
    if (!result.success) {
      return res.status(400).json({ sucess: false, error_type: 'bad_request', message: result.message })
    }
    res.status(200).json({ sucess: true, message: 'Customer details updated successfully.', data: result.data });
  }
  catch (err) {
    next(err)
  }
}

exports.blockCustomerById = async (req, res, next) => {
  try {
    let customerId = req.params?.id
    let result = await customerService.blockCustomerById(customerId)
    if (!result.success) {
      return res.status(400).json({ sucess: false, error_type: 'bad_request', message: result.message })
    }
    res.status(200).json({ sucess: true, message: 'Customer blocked successfully.', data: result.data });
  }
  catch (err) {
    next(err)
  }
}


exports.unBlockCustomerById = async (req, res, next) => {
  try {
    let customerId = req.params?.id
    let result = await customerService.unBlockCustomerById(customerId)
    if (!result.success) {
      return res.status(400).json({ sucess: false, error_type: 'bad_request', message: result.message })
    }
    res.status(200).json({ sucess: true, message: 'Customer unblocked successfully.', data: result.data });
  }
  catch (err) {
    next(err)
  }
}

exports.deactivateCustomerById = async (req, res, next) => {
  try {
    let customerId = req.params?.id
    let result = await customerService.deactivateCustomerById(customerId)
    if (!result.success) {
      return res.status(400).json({ sucess: false, error_type: 'bad_request', message: result.message })
    }
    res.status(200).json({ sucess: true, message: 'Customer deactivated successfully.', data: result.data });
  }
  catch (err) {
    next(err)
  }
}
