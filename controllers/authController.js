const authService = require('../services/authService')

exports.register = async (req, res, next) => {
  try {

    const rb = req.body

    const mobileNumber = rb.mobile
    let isUser = null
    if (rb.sourceBy == 'customer') {
      isUser = await authService.isAlreadyCustomer(mobileNumber)
    }
    else if (rb.sourceBy == 'driver') {
      isUser = await authService.isAlreadyDriver(mobileNumber)
    }
    else {
      return res.status(400).json({ sucess: false, error_type: 'bad_request', message: 'Invalid payload.' })
    }

    if (isUser) {
      const isNotVerified = await authService.isNotVerifiedUser(mobileNumber)
      if (isNotVerified) {

        const result = await authService.sendMobileOtp(mobileNumber)
        if (!result.success) {
          return res.status(400).json({ sucess: false, error_type: 'internal_server_error', message: 'Something went wrong. please try again.' })
        }

        return res.status(200).json({ sucess: true, message: 'Otp sent successfully', token: result.token })
      }

      const isAlreadyUser = await authService.isAlreadyUser(mobileNumber)
      if (isAlreadyUser) {
        return res.status(400).json({ sucess: false, error_type: 'bad_request', message: 'User already exist. please login.' })
      }

      return res.status(400).json({ sucess: false, error_type: 'bad_request', message: 'Invalid payload.' })
    }

    let registeredCustomer = await authService.createUserByMobile(rb)
    if (!registeredCustomer.success) {
      return res.status(400).json({ sucess: false, error_type: 'bad_request', message: registeredCustomer.message })
    }

    const result = await authService.sendMobileOtp(mobileNumber)
    if (!result.success) {
      return res.status(400).json({ sucess: false, error_type: 'internal_server_error', message: 'Something went wrong. please try again.' })
    }

    return res.status(200).json({ sucess: true, message: 'Otp sent successfully', token: result.token })
  }
  catch (err) {
    next(err)
  }
}



exports.login = async (req, res, next) => {
  try {

    const rb = req.body

    const mobileNumber = rb.mobile
    let isUser = await authService.isAlreadyUser(mobileNumber)
    if (isUser) {
      const result = await authService.sendMobileOtp(mobileNumber)
      if (!result.success) {
        return res.status(400).json({ sucess: false, error_type: 'internal_server_error', message: 'Something went wrong. please try again.' })
      }
      res.status(200).json({ sucess: true, message: 'Otp sent successfully', token: result.token })
    }
    return res.status(400).json({ sucess: false, error_type: 'bad_request', message: 'User is not exist.' })
  }
  catch (err) {
    next(err)
  }
}


exports.verifyMobileOtp = async (req, res, next) => {
  try {

    const { type, token, otp } = req.body
    let result = await authService.verifyMobileOtp(type, token, otp)

    if (!result.success) {
      return res.status(400).json({ sucess: false, error_type: 'bad_request', message: result.message })
    }
    res.status(200).json({ sucess: true, message: 'OTP verified successfully', data: { token: result.token, id: result.id } });
  }
  catch (err) {
    next(err)
  }
}


exports.adminUserRegister = async (req, res, next) => {
  try {

    const rb = req.body
    let result = await authService.adminUserRegister(rb)

    if (!result.success) {
      res.status(400).json({ sucess: false, error_type: 'bad_request', message: result.message })
      return
    }
    res.status(200).json({ sucess: true, message: 'Admin User created successfully', data: { id: result.data._id } });
  }
  catch (err) {
    next(err)
  }
}


exports.adminUserLogin = async (req, res, next) => {
  try {

    const rb = req.body
    let result = await authService.adminUserLogin(rb)
    if (!result.success) {
      return res.status(400).json({ sucess: false, error_type: 'bad_request', message: result.message })
    }
    res.status(200).json({ sucess: true, message: 'Admin User Logged in successfully', data: { token: result.token, id: result.id } });
  }
  catch (err) {
    next(err)
  }
}



exports.getUserProfile = async (req, res, next) => {
  try {
    let userId = req.user?.id
    let result = await authService.getUserProfile(userId)
    res.status(200).json({ sucess: true, message: 'User details fetched successfully', data: result });
  }
  catch (err) {
    next(err)
  }
}



exports.updateUserInfoByGoogle = async (req, res, next) => {
  try {
    let rb = req.body
    let id = req.params?.id
    let result = await authService.updateUserInfoByGoogle(rb, id)
    if (!result.success) {
      return res.status(400).json({ sucess: false, error_type: 'bad_request', message: result.message })
    }
    res.status(200).json({ sucess: true, message: 'Update User Successfully', data: result.data });
  }
  catch (err) {
    next(err)
  }
}


exports.googleAuthSuccess = async (req, res,next) => {
  try {
    if (req.user) {
      let googleId = req.user.id
      let user = await authService.getUserByGoogleId(googleId)
      if (user) {
        let userId=user._id
        let token = authService.generateJwtToken(userId)
        if (!token) {
          return res.status(400).json({ success: false, error_type: 'internal_server_error', message: 'Somthing went wrong.' });
        }
        return res.status(200).json({ success: true, message: 'Successfully Loged In', data: { id: userId, token: token } });
      }
      return res.status(400).json({ success: false, error_type: 'bad_request', message: 'User not found' });
    } else {
      res.status(403).json({ success: false, error_type: 'authorization_error', message: 'Not Authorized' });
    }
  }
  catch (err) {
    next(err)
  }
}