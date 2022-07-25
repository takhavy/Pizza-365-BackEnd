//Import orderModel vào
const orderModel = require('../models/orderModel');

//Import userModel vào
const userModel = require('../models/userModel');

//Khai báo thư viện mongoose để tạo _id
var mongoose = require('mongoose');

//Hàm tạo mới 1 orders
const createOrder = (request, response) => {
  // B1: Thu thập dữ liệu
  let userId = request.params.userId;
  let bodyRequest = request.body;
  // B2: Kiểm tra dữ liệu
  if (!bodyRequest.pizzaSize) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "pizzaSize is required"
    })
  }
  if (!bodyRequest.pizzaType) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "pizzaType is required"
    })
  }
  if (!bodyRequest.status) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "status is required"
    })
  }
  // B3: Thao tác với cơ sở dữ liệu
  let createOrder = {
    _id: new mongoose.Types.ObjectId(),
    pizzaSize: bodyRequest.pizzaSize,
    pizzaType: bodyRequest.pizzaType,
    status: bodyRequest.status,
    orderCode: bodyRequest.orderCode
  }
  orderModel.create(createOrder, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      userModel.findByIdAndUpdate(userId,
        {
          $push: { orders: data._id }
        },
        (err, data) => {
          if (err) {
            return response.status(500).json({
              status: "Error 500: Internal server error",
              message: err.message
            })
          } else {
            return response.status(201).json({
              status: "Create Order Success",
              data: data
            })
          }
        }
      )

    }

  })
}

//Hàm lấy hết orders
const getAllOrder = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  //B2: Validate dữ liệu
  //B3: Thao tác với cơ sở dữ liệu
  orderModel.find((error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      response.status(200).json({
        status: "Success: Get all orders success",
        data: data
      })
    }
  })
}

//Hàm lấy 1 order theo ID
const getOrderById = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let orderId = request.params.orderId;
  console.log(orderId);
  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Order ID is not valid"
    })
  }
  //B3: Thao tác với cơ sở dữ liệu
  orderModel.findById(orderId, (error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      response.status(200).json({
        status: "Success: Get order by id success",
        data: data
      })
    }
  })
}

//Hàm update order by ID
const updateOrderById = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let orderId = request.params.orderId;
  let bodyRequest = request.body;
  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Order ID is not valid"
    })
  }
  //B3: Thao tác với cơ sở dữ liệu
  let updateOrder = {
    pizzaSize: bodyRequest.pizzaSize,
    pizzaType: bodyRequest.pizzaType,
    status: bodyRequest.status
  }
  orderModel.findByIdAndUpdate(orderId, updateOrder, (error, data) => {
    if (error) {
      response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      response.status(200).json({
        status: "Success: Update order by id success",
        data: data
      })
    }
  })
}

//Hàm xoá 1 order by ID
const deleteOrderById = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let orderId = request.params.orderId;
  let userId = request.params.userId;
  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Order ID is not valid"
    })
  }
  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "User ID is not valid"
    })
  }
  //B3: Thao tác với cơ sở dữ liệu
  orderModel.findByIdAndDelete(orderId, (error) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      //sau khi xoá xong 1 order thì cần phải xoá orderID đó ra khỏi user tương ứng        
      userModel.findByIdAndUpdate(userId,
        {
          $pull: { orders: orderId }
        },
        (err, data) => {
          if (err) {
            return response.status(500).json({
              status: "Error 500: Internal server error",
              message: err.message
            })
          } else {
            return response.status(204).json({
              status: "Success: Delete order success"
            })
          }
        }
      )
    }
  })

}
module.exports = {
  createOrder,
  getAllOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById
};