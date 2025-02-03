const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const bannerController = require('../controllers/bannerController');
const bannerFileValidationSchema = require('../validation/bannerValidation');


router.post('/', upload.single('image'), bannerFileValidationSchema, bannerController.createBanner);
router.get('/', bannerController.getAllBanners);
router.get('/available', bannerController.getAvailableBanners);
router.get('/:id', bannerController.getBannerById);
router.put('/update/:id', upload.single('image'), bannerFileValidationSchema, bannerController.updateBannerById);
router.delete('/delete/:id', bannerController.deleteBannerById);

module.exports = router;
