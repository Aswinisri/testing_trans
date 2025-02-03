const Banner = require('../models/bannerModel');


exports.createBanner = async (bannerData) => {
  try {
    const banner = new Banner(bannerData);
    const result = await banner.save();
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
};


exports.getAllBanners = async () => {
  try {
    const result = await Banner.find();
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

exports.getAvailableBanners = async () => {
  try {
    const result = await Banner.find({ status: true });
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

exports.getBannerById = async (id) => {
  try {
    const result = await Banner.findById(id);
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
};


exports.updateBannerById = async (id, updateData) => {
  try {
    const result = await Banner.findByIdAndUpdate(id, updateData, { new: true });
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
};


exports.deleteBannerById = async (id) => {
  try {
    const result = await Banner.findByIdAndDelete(id);
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

