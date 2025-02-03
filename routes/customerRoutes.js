const express = require('express')
const { getCustomerById, updateCustomerById, deactivateCustomerById } = require('../controllers/customerController')
const checkAuth = require('../middleware/checkAuth')
const checkRole = require('../middleware/checkRole')
const validateRequest = require('../middleware/validateRequest')
const { updateCustomerProfileRequest } = require('../validation/customerRequest')
const router = express.Router()

router.get('/profile/:id', checkAuth, checkRole('customer'), getCustomerById)
router.put('/profile/:id', checkAuth, checkRole('customer'), validateRequest(updateCustomerProfileRequest), updateCustomerById)
router.put('/deactivate/:id', checkAuth, checkRole('customer'), deactivateCustomerById)


module.exports = router
