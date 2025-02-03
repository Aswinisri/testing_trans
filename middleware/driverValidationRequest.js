function validateDriverDetails(req, res, next) {
  const requiredFields = [
    
    'vehicleType',
    'vehicleNo',
    'licenseFront',
    'licenseBack',
    'rcbook',
    'aadhar',
    'pan',
    'driverSelfie',
    'vehicleInsurance'
  ];

  for (let field of requiredFields) {
    if ((field.includes('license') || field.includes('Selfie') || field.includes('Insurance')) && !req.files) {
      return res.status(400).json({ message: `Missing file upload for ${field}` });
    }
    if (!req.body[field] && !req.files[field]) {
      return res.status(400).json({ message: `Missing required field: ${field}` });
    }
  }

  next();
};

module.exports = validateDriverDetails;
