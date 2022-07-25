const mongoose = require("mongoose");

const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel')

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//khai báo random orderCode
function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const createOrder = (request, response) => {
    //B1: chuẩn bị dữ liệu
    let fullName = request.body.fullName;
    let email = request.body.email;
    let address = request.body.address;
    let phone = request.body.phone;
    let pizzaSize = request.body.pizzaSize;
    let pizzaType = request.body.pizzaType;
    let voucher = request.body.voucher;
    let drink = request.body.drink;
    let status = request.body.status;

    let orderCode = generateString(10);
    //B2: kiểm tra dữ liệu
    var vRegexStringEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fullName) {
        return response.status(400).json({
            status: "Error 400: Bad request",
            message: "fullName is required"
        })
    }
    if (!vRegexStringEmail.test(email)) {
        return response.status(400).json({
            status: "Error 400: Bad request",
            message: "email is invalid"
        })
    }
    if (!address) {
        return response.status(400).json({
            status: "Error 400: Bad request",
            message: "address is required"
        })
    }
    if (!phone) {
        return response.status(400).json({
            status: "Error 400: Bad request",
            message: "phone is required"
        })
    }
    if (!pizzaSize) {
        return response.status(400).json({
            status: "Error 400: Bad request",
            message: "pizzaSize is required"
        })
    }
    if (!pizzaType) {
        return response.status(400).json({
            status: "Error 400: Bad request",
            message: "pizzaType is required"
        })
    }
    if (!mongoose.Types.ObjectId.isValid(voucher)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "voucher is invalid"
        })
    }
    if (!mongoose.Types.ObjectId.isValid(drink)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "drink is invalid"
        })
    }
    if (!status) {
        return response.status(400).json({
            status: "Error 400: Bad request",
            message: "status is required"
        })
    }

    //B3: thao tác dữ liệu
    userModel.findOne(
        {
            email: email
        },
        (errorFindUser, userExist) => {
            if (errorFindUser) {
                return response.status(500).json({
                    status: "Error 500: Internal server error",
                    message: errorFindUser.message
                })
            } else {
                //Nếu user mà chưa tồn tại, tạo mới user
                if (!userExist) {
                    userModel.create(
                        {
                            _id: mongoose.Types.ObjectId(),
                            fullName: fullName,
                            email: email,
                            address: address,
                            phone: phone
                        },
                        (errCreateUser, userCreated) => {
                            if (errCreateUser) {
                                return response.status(500).json({
                                    status: "Error 500: Internal server error",
                                    message: errCreateUser.message
                                })
                            } else {
                                orderModel.create(
                                    {
                                        _id: mongoose.Types.ObjectId(),
                                        orderCode: orderCode,
                                        pizzaSize: pizzaSize,
                                        pizzaType: pizzaType,
                                        voucher: voucher,
                                        drink: drink,
                                        status: status
                                    },
                                    (errorCreateOrder, orderCreated) => {
                                        if (errorCreateOrder) {
                                            return response.status(500).json({
                                                status: "Error 500: Internal server error",
                                                message: errCreateUser.message
                                            })
                                        } else {
                                            userModel.findByIdAndUpdate(userCreated._id,
                                                { $push: { orders: orderCreated._id } },
                                                (errorCreateOrder, orderCreated) => {
                                                    if (errorCreateOrder) {
                                                        return response.status(500).json({
                                                            status: "Error 500: Internal server error",
                                                            message: errorCreateOrder.message
                                                        })
                                                    } else {
                                                        return response.status(201).json({
                                                            status: "Create Order Success",
                                                            data: orderCreated
                                                        })
                                                    }
                                                }
                                            )
                                        }
                                    })
                            }
                        })
                } else {
                    orderModel.create(
                        {
                            _id: mongoose.Types.ObjectId(),
                            orderCode: orderCode,
                            pizzaSize: pizzaSize,
                            pizzaType: pizzaType,
                            voucher: voucher,
                            drink: drink,
                            status: status
                        },
                        (errorCreateOrder, orderCreated) => {
                            if (errorCreateOrder) {
                                return response.status(500).json({
                                    status: "Error 500: Internal server error",
                                    message: errorCreateOrder.message
                                })
                            } else {
                                userModel.findByIdAndUpdate(userExist._id,
                                    { $push: { orders: orderCreated._id } },
                                    (errorCreateOrder, orderCreated) => {
                                        if (errorCreateOrder) {
                                            return response.status(500).json({
                                                status: "Error 500: Internal server error",
                                                message: errorCreateOrder.message
                                            })
                                        } else {
                                            return response.status(201).json({
                                                status: "Create Order Success",
                                                data: orderCreated
                                            })
                                        }
                                    }
                                )
                            }
                        })
                }
            }
        })

}

module.exports = {
    createOrder: createOrder,

}