const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotel');


router.post('/hotels', hotelController.createHotel);

router.get('/hotels', hotelController.getAllHotels);

router.get('/hotels/:id', hotelController.getHotelById);

router.patch('/hotels/:id', hotelController.updateHotel);

router.delete('/hotels/:id', hotelController.deleteHotel);

module.exports = router;
