const mongoose = require('mongoose')

const goodsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    "enum": ["goods", "customer-cancellation"],
  },
  name: {
    type: String,
    required: true
  }
},
  {
    timestamps: true,
  })

module.exports = mongoose.model('Goods', goodsSchema);
