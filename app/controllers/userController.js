//Import userModel vào
const userModel = require('../models/userModel');

//Khai báo thư viện mongoose để tạo _id
var mongoose = require('mongoose');
const { response } = require('express');

//Hàm tạo mới user
const createUser = (request, response) => {
  // B1: Thu thập dữ liệu
  let bodyRequest = request.body;
  // B2: Kiểm tra dữ liệu
  if (!bodyRequest.fullName) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "fullName is required"
    })
  }
  if (!bodyRequest.address) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "address is required"
    })
  }
  if (!bodyRequest.email) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "email is required"
    })
  }
  if (!bodyRequest.phone) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "phone is required"
    })
  }
  // B3: Thao tác với cơ sở dữ liệu
  let createUser = {
    _id: new mongoose.Types.ObjectId(),
    fullName: bodyRequest.fullName,
    address: bodyRequest.address,
    email: bodyRequest.email,
    phone: bodyRequest.phone
  }
  userModel.create(createUser, (error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      response.status(201).json({
        status: "Success: User created",
        data: data
      })
    }
  })
}
//Hàm lấy hết danh sách users
const getAllUser = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  //B2: Validate dữ liệu
  //B3: Thao tác với cơ sở dữ liệu
  userModel.find((error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      response.status(200).json({
        status: "Success: Get all users success",
        data: data
      })
    }
  })
}

const getAllUserLimit=(request,response)=>{
      //B1: Chuẩn bị dữ liệu
    //B2: Validate dữ liệu
    //B3: Thao tác với cơ sở dữ liệu
    //B1: Chuẩn bị dữ liệu
    let limit = request.query.limit;
    userModel.find().limit(limit).exec((error, data) => {
      if (error) {
        response.status(500).json({
          status: "Error 500: Internal server error",
          message: error.message
        })
      } else {
        if(limit){
          response.status(200).json({
            status: "Success: Get limit users success",
            data: data
          })
        }else{
          response.status(200).json({
            status: "Success: Get all orders success",
            data: data
          })
        }
      }
    })  
}
const getAllUserSkip=(request,response)=>{
  //B1: Chuẩn bị dữ liệu
  //B2: Validate dữ liệu
  //B3: Thao tác với cơ sở dữ liệu
  //B1: Chuẩn bị dữ liệu
  let skip = request.query.skip;
  userModel.find().skip(skip).exec((error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      if(skip){
        response.status(200).json({
          status: "Success: Get skip users success",
          data: data
        })
      }else{
        response.status(200).json({
          status: "Success: Get all users success",
          data: data
        })
      }
    }
  })  
}
const getAllUserSkipLimit=(request,response)=>{
  //B1: Chuẩn bị dữ liệu
  //B2: Validate dữ liệu
  //B3: Thao tác với cơ sở dữ liệu
  //B1: Chuẩn bị dữ liệu
  let skip = request.query.skip;
  let limit = request.query.limit;
  userModel.find().limit(limit).skip(skip).exec((error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      if(skip){
        response.status(200).json({
          status: "Success: Get limit and skip users success",
          data: data
        })
      }else{
        response.status(200).json({
          status: "Success: Get all users success",
          data: data
        })
      }
    }
  })  
}
const getAllUserSortFullName=(request,response)=>{
  //B1: Chuẩn bị dữ liệu
  //B2: Validate dữ liệu
  //B3: Thao tác với cơ sở dữ liệu
  //B1: Chuẩn bị dữ liệu

  userModel.find().sort({fullName:'asc'}).exec((error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
        response.status(200).json({
          status: "Success: Get all users success",
          data: data
        })
    }
  })  
}
const getAllUserSortLimitSkipFullName=(request,response)=>{
  //B1: Chuẩn bị dữ liệu
  //B2: Validate dữ liệu
  //B3: Thao tác với cơ sở dữ liệu
  //B1: Chuẩn bị dữ liệu
  let skip = request.query.skip;
  let limit = request.query.limit;
  userModel.find().sort({fullName:'asc'}).limit(limit).skip(skip).exec((error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
        response.status(200).json({
          status: "Success: Get all users success",
          data: data
        })
    }
  })  
}
//Hàm lấy ra 1 user theo ID
const getUserById = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let userId = request.params.userId;
  console.log(userId);
  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    response.status(400).json({
      status: "Error 400: Bad Request",
      message: "User ID is not valid"
    })
  }
  //B3: Thao tác với cơ sở dữ liệu
  userModel.findById(userId, (error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      response.status(200).json({
        status: "Success: Get user by id success",
        data: data
      })
    }
  })
}
//Hàm cập nhật 1 user theo ID
const updateUserById = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let userId = request.params.userId;
  let bodyRequest = request.body;
  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    response.status(400).json({
      status: "Error 400: Bad Request",
      message: "User ID is not valid"
    })
  }
  //B3: Thao tác với cơ sở dữ liệu
  let updateUser = {
    fullName: bodyRequest.fullName,
    address: bodyRequest.address,
    email: bodyRequest.email,
    phone: bodyRequest.phone
  }
  userModel.findByIdAndUpdate(userId, updateUser, (error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      response.status(200).json({
        status: "Success: Update user by id success",
        data: data
      })
    }
  })
}
//Hàm xoá 1 user theo ID
const deleteUserById = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let userId = request.params.userId;
  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    response.status(400).json({
      status: "Error 400: Bad Request",
      message: "User ID is not valid"
    })
  }
  //B3: Thao tác với cơ sở dữ liệu
  userModel.findByIdAndDelete(userId, (error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      response.status(204).json({
        status: "Success: Delete course success"
      })
    }
  })
}
module.exports = {
  createUser,
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllUserLimit,
  getAllUserSkip,
  getAllUserSortFullName,
  getAllUserSkipLimit,
  getAllUserSortLimitSkipFullName
};