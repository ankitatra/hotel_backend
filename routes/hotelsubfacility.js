// routes/facilityRoutes.js

const express = require('express');
const router = express.Router();
const facilityController = require('../controllers/hotelsubfacility');

// Route to fetch all facilities
router.get('/facilities', facilityController.getAllFacilities);
router.post('/', facilityController.addFacility);
module.exports = router;
