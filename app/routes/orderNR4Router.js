const express = require("express");
const { createOrder } = require('../controllers/orderNR4Controller');
const orderNR4Router = express.Router();

orderNR4Router.post('/devcamp-pizza365/orders', createOrder)

module.exports = orderNR4Router;