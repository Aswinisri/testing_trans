const express = require('express')
const validateRequest = require('../middleware/validateRequest')
const { register, login, verifyMobileOtp } = require('../controllers/authController')
const { registerRequest, loginRequest, verifyOtpRequest } = require('../validation/authRequest')
const router = express.Router()

router.post('/register', validateRequest(registerRequest), register)
router.post('/login', validateRequest(loginRequest), login)

router.post('/verify-otp', validateRequest(verifyOtpRequest), verifyMobileOtp)

module.exports = router
