// stateController.js
const State = require('../models/state'); // Assuming State model is in the same directory

// Controller function to insert multiple states
const insertStates = async (req, res) => {
  try {
    const statesData = req.body; // Assuming the request body contains an array of state objects

    // Insert the array of states into the database
    const insertedStates = await State.insertMany(statesData);

    // Return a success message along with the inserted states as a response
    res.status(201).json({
      message: 'States inserted successfully',
      states: insertedStates,
    });
  } catch (error) {
    // Handle errors
    console.error('Error inserting states:', error);
    res.status(500).json({ message: 'Failed to insert states' });
  }
};
const getAllStates = async (req, res) => {
    try {
      // Query all states from the database
      const states = await State.find();
  
      // Return the fetched states as a response
      res.status(200).json(states);
    } catch (error) {
      // Handle errors
      console.error('Error fetching states:', error);
      res.status(500).json({ message: 'Failed to fetch states' });
    }
  };

module.exports = { insertStates,getAllStates };
