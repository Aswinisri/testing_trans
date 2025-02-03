const { z } = require('zod');

const bannerFileValidationSchema = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error_type: 'file_missing_error',
      message: 'No file uploaded. Please upload a valid image.',
    });
  }

  const fileValidation = z
    .object({
      mimetype: z.string(),
      path: z.string(),
    })
    .refine(
      (value) => ['image/jpeg', 'image/jpg', 'image/png'].includes(value.mimetype),
      {
        message: 'Only JPEG, JPG, or PNG files are allowed for banner images!',
      }
    )
    .safeParse(req.file);

  if (!fileValidation.success) {
    return res.status(400).json({
      success: false,
      error_type: 'file_validation_error',
      message: fileValidation.error.errors.map((error) => ({
        field: 'image',
        message: error.message.toLowerCase(),
      })),
    });
  }

  next();
};

module.exports = bannerFileValidationSchema;
