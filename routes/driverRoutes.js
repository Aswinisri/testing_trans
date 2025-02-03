const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const upload = require("../config/multer")
const checkAuth = require('../middleware/checkAuth')
const checkRole = require('../middleware/checkRole')
const validateDriverDetails = require('../middleware/driverValidationRequest');

router.post(
  '/document', checkAuth, checkRole('driver'),
  upload.fields([
    { name: 'licenseFront', maxCount: 1 },
    { name: 'licenseBack', maxCount: 1 },
    { name: 'rcbook', maxCount: 1 },
    { name: 'aadhar', maxCount: 1 },
    { name: 'pan', maxCount: 1 },
    { name: 'driverSelfie', maxCount: 1 },
    { name: 'vehicleInsurance', maxCount: 1 },
  ]),validateDriverDetails,
  driverController.createDriverDetails
);

router.put('/profile/:id', checkAuth, checkRole('driver'), driverController.updateDriverById)
router.put('/profile/document/:id', checkAuth, checkRole('driver'),
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
router.get('/profile/:id', checkAuth, checkRole('driver'), driverController.getDriverById);
router.put('/deactivate/:id', checkAuth, checkRole('driver'), driverController.deactivateDriverById);


module.exports = router;
