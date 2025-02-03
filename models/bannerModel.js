const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  }

},
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Banner', bannerSchema);