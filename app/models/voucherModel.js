const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voucherSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId
  },
  maVoucher: {
    type: String,
    unique: true,
    required: true
  },
  phanTramGiamGia: {
    type: Number,
    required: true
  },
  ghiChu: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("voucher", voucherSchema);