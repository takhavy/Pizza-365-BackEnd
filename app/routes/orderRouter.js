const express = require('express');
const router = express.Router();

//Import orderController vào
const {
  createOrder,
  getAllOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById
} = require('../controllers/orderController');

router.post('/users/:userId/orders', createOrder);

router.get('/orders', getAllOrder);

router.get('/orders/:orderId', getOrderById);

router.put('/orders/:orderId', updateOrderById);

router.delete('/users/:userId/orders/:orderId', deleteOrderById);

module.exports = router;
