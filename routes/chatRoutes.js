const express = require('express');
const chatController = require('../controllers/chatController');
const checkAuth = require('../middleware/checkAuth')
const checkRole = require('../middleware/checkRole')
const router = express.Router();

router.get('/history',checkAuth, checkRole('customer','driver'), chatController.getChatHistory);
router.post('/create', chatController.createChat);

// Route to send a message
router.post('/send',checkAuth, checkRole('customer','driver'), chatController.sendMessage);

module.exports = router;