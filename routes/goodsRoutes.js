const express = require('express');
const router = express.Router();
const goodsController = require('../controllers/goodsController')

router.post('/', goodsController.createGoods);
router.get('/static', goodsController.getAllGoods);
router.get('/:id', goodsController.getGoodsById);
router.put('/update/:id', goodsController.updateGoodsById);
router.delete('/delete/:id', goodsController.deleteGoodsById);

module.exports = router;