const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const checkAuth = require('../middleware/checkAuth')
const checkRole = require('../middleware/checkRole')


router.post('/', orderController.createOrder);
router.get('/customer/:id', checkAuth, checkRole('customer'), orderController.getCustomerOrderHistory);
router.get('/driver/:id', checkAuth, checkRole('driver'), orderController.getDriverOrderHistory);
router.get('/:id', checkAuth, orderController.getOrderById);
router.put('/:id', checkAuth, orderController.updateOrderById);

module.exports = router;
