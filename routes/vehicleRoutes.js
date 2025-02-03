const express = require('express')
const router = express.Router()
const vehicleController = require('../controllers/vehicleController')
const checkAuth = require('../middleware/checkAuth')
const checkRole = require('../middleware/checkRole')


router.get('/', checkAuth, checkRole('customer'), vehicleController.getAllAvailableVehicles)
router.get('/:id', checkAuth, checkRole('customer'), vehicleController.getVehicleById)

module.exports = router; 
