//Import drinkModel vào
const drinkModel = require('../models/drinkModel');

//Khai báo thư viện mongoose
var mongoose = require('mongoose');

//Hàm tạo mới drink
const createDrink = (request, response) => {
  // B1: Thu thập dữ liệu
  let bodyRequest = request.body;
  // B2: Kiểm tra dữ liệu
  if (!bodyRequest.maNuocUong) {
    response.status(400).json({
      status: "Error 400: Bad Request",
      message: "maNuocUong is required"
    })
  }

  if (!bodyRequest.tenNuocUong) {
    response.status(400).json({
      status: "Error 400: Bad Request",
      message: "tenNuocUong is required"
    })
  }

  if (!(Number.isInteger(bodyRequest.donGia) && bodyRequest.donGia > 0)) {
    response.status(400).json({
      status: "Error 400: Bad Request",
      message: "donGia is not valid"
    })
  }

  // B3: Thao tác với cơ sở dữ liệu
  let createDrink = {
    _id: new mongoose.Types.ObjectId(),
    maNuocUong: bodyRequest.maNuocUong,
    tenNuocUong: bodyRequest.tenNuocUong,
    donGia: bodyRequest.donGia
  }
  drinkModel.create(createDrink, (error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      response.status(201).json({
        status: "Success: Drink created",
        data: data
      })
    }
  })
}

//Lấy hết danh sách drink
const getAllDrink = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  //B2: Validate dữ liệu
  //B3: Thao tác với cơ sở dữ liệu
  drinkModel.find((error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      response.status(200).json({
        status: "Success: Get all drink success",
        data: data
      })
    }
  })
}

//Lấy 1 drink theo id
const getDrinkById = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let drinkId = request.params.drinkId;
  console.log(drinkId);
  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(drinkId)) {
    response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Drink ID is not valid"
    })
  }
  //B3: Thao tác với cơ sở dữ liệu
  drinkModel.findById(drinkId, (error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      response.status(200).json({
        status: "Success: Get drink by ID success",
        data: data
      })
    }
  })
}

//Update drink theo ID
const updateDrinkById = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let drinkId = request.params.drinkId;
  let bodyRequest = request.body;

  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(drinkId)) {
    response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Drink ID is not valid"
    })
  }
  //B3: Thao tác với cơ sở dữ liệu
  let drinkUpdate = {
    maNuocUong: bodyRequest.maNuocUong,
    tenNuocUong: bodyRequest.tenNuocUong,
    donGia: bodyRequest.donGia
  }

  drinkModel.findByIdAndUpdate(drinkId, drinkUpdate, (error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      response.status(200).json({
        status: "Success: Update drink success",
        data: data
      })
    }
  })
}

//Xoá 1 drink theo ID
const deleteDrinkById = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let drinkId = request.params.drinkId;
  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(drinkId)) {
    response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Drink ID is not valid"
    })
  }
  //B3: Thao tác với cơ sở dữ liệu
  drinkModel.findByIdAndDelete(drinkId, (error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      response.status(204).json({
        status: "Success: Delete drink success"
      })
    }
  })
}

module.exports = {
  createDrink: createDrink,
  getAllDrink: getAllDrink,
  getDrinkById: getDrinkById,
  updateDrinkById: updateDrinkById,
  deleteDrinkById: deleteDrinkById
}