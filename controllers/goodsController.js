const goodsService =require('../services/goodsService')

exports.createGoods = async (req, res, next) => {
  try {
    const {type,name}= req.body;
    const result = await goodsService.createGoods(req.body);

    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(200).json({ success: true, message: 'Goods created successfully', data: result.data });
  } catch (err) {
    next(err);
  }
};


exports.getAllGoods = async (req, res, next) => {
    try {
      const { type } = req.query; 
      const filter = type ? { type } : {}; 
  
      const result = await goodsService.getAllGoods(filter);
      if (!result.success) {
        return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
      }
  
      res.status(200).json({ success: true, message: 'Goods retrieved successfully', data: result.data });
    } catch (err) {
      next(err);
    }
  };


exports.getGoodsById = async (req, res, next) => {
  try {

    const id = req.params?.id;
    const result = await goodsService.getGoodsById(id);
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(200).json({ success: true, message: 'Goods retrieved successfully', data: result.data });
  } catch (err) {
    next(err);
  }
};


exports.updateGoodsById = async (req, res, next) => {
  try {
    const id = req.params?.id;
    const updateData = req.body;

    const result = await goodsService.updateGoodsById(id, updateData);
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(200).json({ success: true, message: 'Goods updated successfully', data: result.data });
  } catch (err) {
    next(err);
  }
};


exports.deleteGoodsById = async (req, res, next) => {
  try {
    const id = req.params?.id;
    const result = await goodsService.deleteGoodsById(id);
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(200).json({ success: true, message: 'Goods deleted successfully', data: result.data });
  } catch (err) {
    next(err);
  }
};
