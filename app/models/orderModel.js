const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId
  },
  orderCode: {
    type: String,
    unique: true
  },
  pizzaSize: {
    type: String,
    required: true
  },
  pizzaType: {
    type: String,
    required: true
  },
  voucher: {
    type: mongoose.Types.ObjectId,
    ref: "voucher"
  },
  drink: {
    type: mongoose.Types.ObjectId,
    ref: "drink"
  },
  status: {
    type: String,
    required: true
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

module.exports = mongoose.model("order", orderSchema);