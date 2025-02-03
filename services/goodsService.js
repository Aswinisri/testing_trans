const Goods = require('../models/goodsModel')

exports.createGoods = async (goodsData) => {
  try {
    const goods = new Goods(goodsData);
    const result = await goods.save();
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

exports.getAllGoods = async (filter = {}) => {
  try {
    const result = await Goods.find(filter);
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
};


exports.getGoodsById = async (id) => {
  try {
    const result = await Goods.findById(id);
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
};


exports.updateGoodsById = async (id, updateData) => {
  try {
    const result = await Goods.findByIdAndUpdate(id, updateData, { new: true });
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
};


exports.deleteGoodsById = async (id) => {
  try {
    const result = await Goods.findByIdAndDelete(id);
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

