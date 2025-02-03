const authService = require('../services/authService')

const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      const userId = req.user?.id
      if (!userId) {
        return res.status(400).json({ success: false, error_type: 'bad_request', message: 'Invalid payload' })
      }
      let result = await authService.getUserProfile(userId)

      if (!result) {
        return res.status(400).json({ success: false, error_type: 'bad_request', message: 'Invalid payload' })
      }
      if (result.role != role) {
        return res.status(400).json({ success: false, error_type: 'authorization_error', message: 'Authorization failed' })
      }
      next()
    }
    catch (err) {
      next(err)
    }
  }

}

module.exports = checkRole