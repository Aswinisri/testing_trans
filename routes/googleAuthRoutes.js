const router = require('express').Router();
const passport = require('passport');
const { updateUserInfoByGoogle, googleAuthSuccess } = require('../controllers/authController')
const { updateUserInfoByGoogleRequest } = require('../validation/googleAuth')
const validateRequest = require('../middleware/validateRequest');

router.get('/', passport.authenticate('google', ['profile', 'email']));

router.get('/login/success',googleAuthSuccess );

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false, message: 'Log in failure',
  });
});


router.get('/callback', passport.authenticate('google', { successRedirect: process.env.CLIENT_URL, failureRedirect: '/google/login/failed' }));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

router.put('/user/update/:id', validateRequest(updateUserInfoByGoogleRequest), updateUserInfoByGoogle);

module.exports = router;
