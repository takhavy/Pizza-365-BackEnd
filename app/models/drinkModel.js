const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drinkSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId
  },
  maNuocUong: {
    type: String,
    required: true,
    unique: true
  },
  tenNuocUong: {
    type: String,
    required: true
  },
  donGia: {
    type: Number,
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

module.exports = mongoose.model("drink", drinkSchema);