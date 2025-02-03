const bannerService = require('../services/bannerService');
const cloudinary = require('cloudinary').v2;


exports.createBanner = async (req, res, next) => {
  try {
    const { image, type } = req.body;
    const bannerData = {
      image: req.file.path,
      type
    };

    const result = await bannerService.createBanner(bannerData);

    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(200).json({ success: true, message: 'Banner created successfully', data: result.data });
  } catch (err) {
    next(err);
  }
};


exports.getAllBanners = async (req, res, next) => {
  try {
    const result = await bannerService.getAllBanners();
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(200).json({ success: true, message: 'Banners retrieved successfully', data: result.data });
  } catch (err) {
    next(err);
  }
};


exports.getBannerById = async (req, res, next) => {
  try {

    const id = req.params?.id;
    const result = await bannerService.getBannerById(id);
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(200).json({ success: true, message: 'Banner retrieved successfully', data: result.data });
  } catch (err) {
    next(err);
  }
};


exports.getAvailableBanners = async (req, res) => {
  try {
    const result = await bannerService.getAvailableBanners();
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(200).json({ success: true, message: 'Available Banners retrieved successfully', data: result.data });
  } catch (err) {
    next(err);
  }
};

exports.updateBannerById = async (req, res, next) => {
  try {
    const id = req.params?.id;
    const updateData = req.body;
    if (req.file) updateData.image = req.file.path;

    const result = await bannerService.updateBannerById(id, updateData);
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(200).json({ success: true, message: 'Banners updated successfully', data: result.data });
  } catch (err) {
    next(err);
  }
};


exports.deleteBannerById = async (req, res, next) => {
  try {
    const id = req.params?.id;
    const result = await bannerService.deleteBannerById(id);
    if (!result.success) {
      return res.status(400).json({ success: false, error_type: 'bad_request', message: result.message });
    }
    res.status(200).json({ success: true, message: 'Banner deleted successfully', data: result.data });
  } catch (err) {
    next(err);
  }
};
