
const mongoose = require('mongoose');


const driverDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  vehicleNo: {
    type: String,
    required: true
  },

  licenseDoc: {
    frontUrl: {
      type: String,
      required: true
    },
    backUrl: {
      type: String,
      required: true
    }
  },
  rcbookUrl: {
    type: String,
    required: true
  },
  aadharUrl:{
    type: String,
    required: true
  },
  panUrl:{
    type: String,
    required: true
  },
  driverSelfieUrl: {
    type: String,
    required: true
  },
  vehicleInsuranceUrl: {
    type: String,
    required: true
  }
},{
  timestamps: true,
});


module.exports = mongoose.model('DriverDetails', driverDetailsSchema);
