const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
  try {
    let token = req.headers.authorization
    if (!token) {
      return res.status(403).json({ success: false, error_type: 'authentication_error', message: 'Token is required' })
    }

    let decode = jwt.verify(token, process.env.JWT_SECRET)

    if (!decode) {
      return res.status(403).json({ success: false, error_type: 'authentication_error', message: 'Invalid token' })
    }
    req.user = decode
    next()
  }
  catch (err) {    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error_type: 'authentication_error',
        message: 'Token has expired'
      });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({
        success: false,
        error_type: 'authentication_error',
        message: 'Invalid token'
      });
    } else {
      return res.status(500).json({
        success: false,
        error_type: 'internal_server_error',
        message: 'Internal server error'
      });
    }
  }
}

module.exports = checkAuth