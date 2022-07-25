const express = require('express');
const router = express.Router();

//Middleware
const { voucherMiddleware } = require('../middlewares/voucherMiddleware');

//Controller
const { createVoucher,
        getAllVoucher,
        getVoucherById,
        updateVoucherById,
        deleteVoucherById
} = require('../controllers/voucherController');

router.post('/vouchers', voucherMiddleware, createVoucher);

router.get('/vouchers', voucherMiddleware, getAllVoucher);

router.get('/vouchers/:voucherId', voucherMiddleware, getVoucherById);

router.put('/vouchers/:voucherId', voucherMiddleware, updateVoucherById);

router.delete('/vouchers/:voucherId', voucherMiddleware, deleteVoucherById);

module.exports = router;
