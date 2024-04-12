// controllers/facilityController.js

const Hotelsubfacility = require('../models/hotelsubfacility');


// Controller function to fetch all facilities
exports.getAllFacilities = async (req, res) => {
    try {
        const facilities = await Hotelsubfacility.find();
        
        // Initialize an empty object to store the transformed data
        const transformedData = {};

        // Loop through the fetched facilities and populate the transformedData object
        facilities.forEach(facility => {
            transformedData[facility.category] = facility.subFacilities;
        });

        res.json(transformedData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.addFacility = async (req, res) => {
    const { category, subFacilities } = req.body;

    try {
        const newFacility = new Hotelsubfacility({
            category,
            subFacilities
        });

        await newFacility.save();

        res.status(201).json(newFacility);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};