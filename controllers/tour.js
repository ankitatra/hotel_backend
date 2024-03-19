const Tour = require('../models/tour');

// Create a new tour
const createTour = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;
    const { name, location, cost, duration ,uuid} = req.body;
    const newTour = new Tour({ name, location, cost, duration, vendor: vendorId ,uuid});
    const savedTour = await newTour.save();
    res.status(201).json({ message: 'Tour created successfully', tour: savedTour });
  } catch (error) {
    console.error('Error creating tour:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json(tours);
  } catch (error) {
    console.error('Error fetching tours:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getToursForVendor = async (req, res) => {
    try {
      const { vendorId } = req.params; 
   
      const tours = await Tour.find({ vendor:vendorId }); 
   
      res.status(200).json(tours);
    } catch (error) {
      console.error('Error fetching vendor tours:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
module.exports = {
    createTour,
    getAllTours,
    getToursForVendor
  };