//Import voucherModel vào
const voucherModel = require('../models/voucherModel');

//Khai báo thư viện mongoose
var mongoose = require('mongoose');

//Hàm tạo mới voucher
const createVoucher = (request, response) => {
  // B1: Thu thập dữ liệu
  let bodyRequest = request.body;
  // B2: Kiểm tra dữ liệu
  if (!bodyRequest.maVoucher) {
    response.status(400).json({
      status: "Error 400: Bad Request",
      message: "maVoucher is required"
    })
  }

  if (!bodyRequest.ghiChu) {
    response.status(400).json({
      status: "Error 400: Bad Request",
      message: "ghiChu is required"
    })
  }

  if (!(Number.isInteger(bodyRequest.phanTramGiamGia) && bodyRequest.phanTramGiamGia > 0)) {
    response.status(400).json({
      status: "Error 400: Bad Request",
      message: "phanTramGiamGia is not valid"
    })
  }

  // B3: Thao tác với cơ sở dữ liệu
  let createVoucher = {
    _id: new mongoose.Types.ObjectId(),
    maVoucher: bodyRequest.maVoucher,
    phanTramGiamGia: bodyRequest.phanTramGiamGia,
    ghiChu: bodyRequest.ghiChu
  }
  voucherModel.create(createVoucher, (error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      response.status(201).json({
        status: "Success: Voucher created",
        data: data
      })
    }
  })
}

//Lấy hết danh sách voucher
const getAllVoucher = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  //B2: Validate dữ liệu
  //B3: Thao tác với cơ sở dữ liệu
  voucherModel.find((error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      response.status(200).json({
        status: "Success: Get all voucher success",
        data: data
      })
    }
  })
}

//Lấy 1 vouhcer theo id
const getVoucherById = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let voucherId = request.params.voucherId;
  console.log(voucherId);
  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(voucherId)) {
    response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Voucher ID is not valid"
    })
  }
  //B3: Thao tác với cơ sở dữ liệu
  voucherModel.findById(voucherId, (error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      response.status(200).json({
        status: "Success: Get voucher by ID success",
        data: data
      })
    }
  })
}

//Update voucher theo ID
const updateVoucherById = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let voucherId = request.params.voucherId;
  let bodyRequest = request.body;

  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(voucherId)) {
    response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Voucher ID is not valid"
    })
  }
  //B3: Thao tác với cơ sở dữ liệu
  let voucherUpdate = {
    maVoucher: bodyRequest.maVoucher,
    phanTramGiamGia: bodyRequest.phanTramGiamGia,
    ghiChu: bodyRequest.ghiChu
  }

  voucherModel.findByIdAndUpdate(voucherId, voucherUpdate, (error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      response.status(200).json({
        status: "Success: Update voucher by id success",
        data: data
      })
    }
  })
}

//Xoá 1 voucher theo ID
const deleteVoucherById = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let voucherId = request.params.voucherId;
  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(voucherId)) {
    response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Voucher ID is not valid"
    })
  }
  //B3: Thao tác với cơ sở dữ liệu
  voucherModel.findByIdAndDelete(voucherId, (error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      response.status(204).json({
        status: "Success: Delete voucher by ID success"
      })
    }
  })
}

module.exports = {
  createVoucher: createVoucher,
  getAllVoucher: getAllVoucher,
  getVoucherById: getVoucherById,
  updateVoucherById: updateVoucherById,
  deleteVoucherById: deleteVoucherById
}