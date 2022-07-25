const express = require('express');
const router = express.Router();

//Middleware
const {drinkMiddleware} = require('../middlewares/drinkMiddleware');

//Controllers
const { createDrink, 
        getAllDrink, 
        getDrinkById,
        updateDrinkById,
        deleteDrinkById
} = require('../controllers/drinkController');

//Create new drink
router.post("/drinks", drinkMiddleware, createDrink);

//Get all drink
router.get("/devcamp-pizza365/drinks", getAllDrink);

//Get drink by ID
router.get('/drinks/:drinkId', drinkMiddleware, getDrinkById);

//Update drink by ID
router.put('/drinks/:drinkId', drinkMiddleware, updateDrinkById);

router.delete('/drinks/:drinkId', drinkMiddleware, deleteDrinkById);

module.exports = router;
