const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
var mongoose = require('mongoose');

// Cấu hình để app đọc được body request dạng json
app.use(express.json());

// Cấu hình để app được được tiếng Việt UTF8
app.use(express.urlencoded({
    extended: true
}))

//Router
const drinkRouters = require('./app/routes/drinkRouter.js');
const voucherRouter = require('./app/routes/voucherRouter.js');
const usersRouter = require('./app/routes/userRouter.js');
const orderRouter = require('./app/routes/orderRouter');
const orderNR4Router=require('./app/routes/orderNR4Router');

//Model
const Drink = require('./app/models/drinkModel');
const Voucher = require('./app/models/voucherModel');
const Order = require('./app/models/orderModel');
const User = require('./app/models/userModel');

app.use(express.static(`views/Pizza_365`)); // Use this for show image

app.get("/", (request, response) => {
  console.log(`__dirname: ${__dirname}`);
  response.sendFile(path.join(`${__dirname}/views/Pizza_365/43.80.html`));
})

mongoose.connect("mongodb://localhost:27017/CRUD_Pizza365", function (error) {
	if (error) throw error;
	console.log('MongoDB Successfully connected');
})
 
app.use('/', drinkRouters);
app.use('/', voucherRouter);
app.use('/', usersRouter);
app.use('/', orderRouter);
app.use('/', orderNR4Router);

app.listen(port, () => {
  console.log(`8.30 app listening on port ${port}`);
})
