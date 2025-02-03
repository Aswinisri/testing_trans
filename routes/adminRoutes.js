const express = require('express')
const { adminUserRegister, adminUserLogin } = require('../controllers/authController')
const { getAllCustomer, getCustomerById, updateCustomerById, blockCustomerById, unBlockCustomerById } = require('../controllers/customerController')
const validateRequest = require('../middleware/validateRequest')
const checkAdmin = require('../middleware/checkAdmin')
const checkAuth = require('../middleware/checkAuth')
const driverController = require('../controllers/driverController')
const orderController = require('../controllers/orderController')
const vehicleController = require('../controllers/vehicleController')
const upload = require("../config/multer")
const { updateCustomerAdminRequest } = require('../validation/customerRequest')

const router = express.Router()

router.post('/register', adminUserRegister)
router.post('/login', adminUserLogin)
//customer
router.get('/customer', checkAuth, checkAdmin, getAllCustomer)
router.get('/customer/:id', checkAuth, checkAdmin, getCustomerById)
router.put('/customer/:id', checkAuth, checkAdmin, validateRequest(updateCustomerAdminRequest), updateCustomerById)
router.put('/customer/block/:id', checkAuth, checkAdmin, blockCustomerById)
router.put('/customer/unblock/:id', checkAuth, checkAdmin, unBlockCustomerById)
//driver
router.get('/driver', checkAuth, checkAdmin, driverController.getAllDrivers);
router.get('/driver/:id', checkAuth, checkAdmin, driverController.getDriverById);
router.put('/driver/:id', checkAuth, checkAdmin, driverController.updateDriverById);
router.put('/driver/document/:id', checkAuth, checkAdmin,
  upload.fields([
    { name: 'licenseFront', maxCount: 1 },
    { name: 'licenseBack', maxCount: 1 },
    { name: 'rcbook', maxCount: 1 },
    { name: 'aadhar', maxCount: 1 },
    { name: 'pan', maxCount: 1 },
    { name: 'driverSelfie', maxCount: 1 },
    { name: 'vehicleInsurance', maxCount: 1 },
  ]),
  driverController.updateDriverDetails);
router.put('/driver/block/:id', checkAuth, checkAdmin, driverController.blockDriverById);
router.put('/driver/unblock/:id', checkAuth, checkAdmin, driverController.unblockDriverById);
//order
router.get('/order', checkAuth, checkAdmin, orderController.getAllOrders);
router.get('/order/:id', checkAuth, checkAdmin, orderController.getOrderById);
router.get('/order/customer/:id', checkAuth, checkAdmin, orderController.getCustomerOrderHistory);
router.get('/order/driver/:id', checkAuth, checkAdmin, orderController.getDriverOrderHistory);
//vehicle
router.get('/vehicle', checkAuth, checkAdmin, vehicleController.getAllVehicles)
router.get('/vehicle/timeslot', checkAuth, checkAdmin, vehicleController.getAllVehicleTimeslots)
// router.get('/vehicle/:id', checkAuth, checkAdmin, vehicleController.getVehicleById)
router.get('/vehicle/:id', checkAuth, checkAdmin, vehicleController.getVehicleTimeslotById)

router.post('/vehicle', checkAuth, checkAdmin, upload.single('image'), vehicleController.createVehicle);
router.post('/vehicle/timeslot', checkAuth, checkAdmin, vehicleController.createVehicleTimeslot)
router.put('/vehicle/:id', checkAuth, checkAdmin, upload.single('image'), vehicleController.UpdateVehicleById)
router.delete('/vehicle/:id', checkAuth, checkAdmin, vehicleController.deleteVehicleById)
router.delete('/vehicle/timeslot/:id', checkAuth, checkAdmin, vehicleController.deleteVehicleTimeSlotById)

module.exports = router
