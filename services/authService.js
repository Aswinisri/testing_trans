const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const AdminUser = require('../models/adminUserModel')
const axios = require('axios')
const bcrypt = require('bcrypt')
exports.createUserByMobile = async (rb) => {
  try {
    let role = 'customer'
    if (rb.sourceBy == 'customer') {
      role = 'customer'
    }
    else if (rb.sourceBy == 'driver') {
      role = 'driver'
    }
    else {
      return { success: false, message: 'Invalid payload' }
    }

    let data = {
      name: rb.name,
      email: rb.email,
      mobile: rb.mobile,
      gender: rb.gender,
      dob: rb.dob,
      isRegisteredBy: 'mobile',
      role: role
    }
    const user = new User(data)
    const result = await user.save()
    return { success: true, data: result }
  }
  catch (err) {
    return { success: false, message: err.message }
  }
}

exports.updateUserInfoByGoogle = async (rb, id) => {
  try {
    let role = 'customer'
    if (rb.sourceBy == 'customer') {
      role = 'customer'
    }
    else if (rb.sourceBy == 'driver') {
      role = 'driver'
    }
    else {
      return { success: false, message: 'Invalid payload' }
    }

    let data = {
      mobile: rb.mobile,
      gender: rb.gender,
      dob: rb.dob,
      isRegisteredBy: 'mobile',
      role: role
    }
    const result = await User.findByIdAndUpdate(id, data, { new: true }).exec()
    return { success: true, data: result }
  }
  catch (err) {
    return { success: false, message: err.message }
  }

}


exports.sendMobileOtp = async (number) => {
  try {

    const otp = Math.floor(1000 + Math.random() * 9000);

    const JWT_SECRET = process.env.JWT_SECRET

    const token = jwt.sign({ number, otp }, JWT_SECRET, { expiresIn: process.env.JWT_OTP_EXPIRY });

    const payload = {
      'variables_values': otp,
      'route': 'otp',
      'numbers': number
    }

    const fast2smsToken = process.env.FAST2SMS_TOKEN

    const result = await axios.post('https://www.fast2sms.com/dev/bulkV2', payload, {
      headers: {
        Authorization: fast2smsToken
      }
    })

    return { success: true, token }
  }
  catch (err) {
    return { success: false, message: err.message }
  }
}


exports.isAlreadyUser = (number) => {
  return User.findOne({ mobile: number, status: true, isBlocked: false, isVerified: true }).exec();
};

exports.isNotVerifiedUser = (number) => {
  return User.findOne({ mobile: number, status: true, isBlocked: false, isVerified: false }).exec();
};

exports.isAlreadyCustomer = (number) => {
  return User.findOne({ mobile: number, role: 'customer' }).exec();
};

exports.isAlreadyDriver = (number) => {
  return User.findOne({ mobile: number, role: 'driver' }).exec();
};



exports.verifyMobileOtp = async (type, token, otp) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET

    const decoded = jwt.verify(token, JWT_SECRET)

    if (decoded.otp !== otp) {
      return { success: false, message: 'The provided OTP does not match. Please try again.' };
    }

    let user = {}
    if (type == 'login') {
      user = await User.findOne({ mobile: decoded.number, status: true, isBlocked: false, isVerified: true }).exec();
      if (!user) {
        return { success: false, message: 'Customer is not registered.' };
      }
    }
    else if (type == 'register') {
      user = await User.findOneAndUpdate(
        { mobile: decoded.number },
        { isVerified: true },
        { new: true }
      );

      if (!user) {
        return { success: false, message: 'Customer with the provided phone number does not exist.' };
      }
    }
    else {
      return { success: false, message: 'Invalid payload' }

    }

    const userToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    return {
      success: true,
      message: 'OTP verified successfully.',
      token: userToken,
      id: user._id
    };
  }
  catch (err) {
    return { success: false, message: err.message }
  }
}



exports.adminUserRegister = async (rb) => {
  try {
    const email = rb.email
    const existingUser = await AdminUser.findOne({ email });
    if (existingUser) {
      return { success: false, message: 'Email already in use' }
    }
    const result = await new AdminUser(rb).save();
    return { success: true, data: result }
  }
  catch (err) {
    return { success: false, message: err.message }
  }
};

exports.adminUserLogin = async (rb) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET
    const JWT_EXPIRY= process.env.JWT_EXPIRY
    const email = rb.email
    const password = rb.password
    const user = await AdminUser.findOne({ email });
    if (!user) {
      return { success: false, message: 'Invalid payload' }
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: 'Invalid payload' }
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    return { success: true, token, id: user._id }
  }
  catch (err) {
    return { success: false, message: err.message }
  }
};


exports.getUserProfile = async (id) => {
  return User.findById(id).exec()
}

exports.getAdminUserProfile = (id) => {
  return AdminUser.findById(id).exec()
}

exports.getUserByGoogleId = async (id) => {
  return User.findOne({ googleId: id }).exec()
}

exports.generateJwtToken = (id) => {
  const JWT_SECRET = process.env.JWT_SECRET
  const JWT_EXPIRY = process.env.JWT_EXPIRY
  return jwt.sign({ id: id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}