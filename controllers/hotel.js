const Hotel = require('../models/hotel');

const hotelController = {
  // Create a new hotel
  createHotel: async (req, res) => {
    try {
      const hotel = new Hotel(req.body);
      await hotel.save();
      res.status(201).json(hotel);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all hotels
  // getAllHotels: async (req, res) => {
  //   try {
  //     const hotels = await Hotel.find();
  //     res.json(hotels);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },

//   getAllHotels: async (req, res) => {
//     try {
//         // Construct the filter object based on the request query parameters
//         let filter = {};

//         // Handle style filter
//         if (req.query.style) {
//             filter.style = { $all: req.query.style }; // Find hotels with any of the specified styles
//         }

//         // Handle amenities filter
//         if (req.query.amenities) {
//             filter.amenities = { $all: req.query.amenities }; // Find hotels with any of the specified amenities
//         }

//         // Handle deals filter
//         if (req.query.deals) {
//             filter.deals = { $all: req.query.deals }; // Find hotels with any of the specified deals
//         }

//         // Handle hotel_facilitys filter
//         if (req.query.hotel_facility) {
//             filter.hotel_facility = { $all: req.query.hotel_facility}; // Find hotels with any of the specified facilities
//         }

//         // Fetch hotels based on the constructed filter object
//         console.log(filter)
       
//         const hotels = await Hotel.find(filter);
//         res.json(hotels);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// },



  getAllHotels: async (req, res) => {
    try {
        // Construct the filter object based on the request query parameters
        let filter = {};

        // if (req.query.query) {
        //   const searchQuery = req.query.query;
        //   const regexPattern = searchQuery.replace(/[-]/g, '[- ]');
        //   filter.$or = [
        //       // Case-insensitive partial match for hotel name
        //       { name: { $regex: new RegExp(regexPattern, 'i') } },
        //       // Case-insensitive partial match for location
        //       { location: { $regex: new RegExp(regexPattern, 'i') } },
        //       // Case-insensitive partial match for room types
        //       { 'room.roomtype': { $regex: new RegExp(regexPattern, 'i') } },
        //       // Case-insensitive partial match for room facilities
        //       { 'room.facility': { $regex: new RegExp(regexPattern, 'i') } },
        //       // Case-insensitive partial match for amenities
        //       { amenities: { $regex: new RegExp(regexPattern, 'i') } },
        //       // Case-insensitive partial match for hotel styles
        //       { style: { $regex: new RegExp(regexPattern, 'i') } },
        //       // Case-insensitive partial match for deals
        //       { deals: { $regex: new RegExp(regexPattern, 'i') } }
        //   ];
        // }
      
        if (req.query.query) {
          const searchQuery = req.query.query;
          const regexPattern = searchQuery.replace(/-/g, '-?\\s?');
          filter.$or = [
              // Case-insensitive partial match for hotel name
              { name: { $regex: new RegExp(regexPattern, 'i') } },
              // Case-insensitive partial match for location
              { location: { $regex: new RegExp(regexPattern, 'i') } },
              // Case-insensitive partial match for room types
              { 'room.roomtype': { $regex: new RegExp(regexPattern, 'i') } },
              // Case-insensitive partial match for room facilities
              { 'room.facility': { $regex: new RegExp(regexPattern, 'i') } },
              // Case-insensitive partial match for amenities
              { amenities: { $regex: new RegExp(regexPattern, 'i') } },
              // Case-insensitive partial match for hotel styles
              { style: { $regex: new RegExp(regexPattern, 'i') } },
              // Case-insensitive partial match for deals
              { deals: { $regex: new RegExp(regexPattern, 'i') } }
          ];
      }
      
        // Handle style filter
        if (req.query.style) {
            filter.style = { $all: req.query.style }; // Find hotels with any of the specified styles
        }

        // Handle amenities filter
        if (req.query.amenities) {
            filter.amenities = { $all: req.query.amenities }; // Find hotels with any of the specified amenities
        }

        // Handle deals filter
        if (req.query.deals) {
            filter.deals = { $all: req.query.deals }; // Find hotels with any of the specified deals
        }

        // Handle hotel_facilitys filter
        if (req.query.hotel_facility) {
            filter.hotel_facility = { $all: req.query.hotel_facility}; // Find hotels with any of the specified facilities
        }

        // Handle price filter
        if (req.query.minPrice && req.query.maxPrice) {
            filter['room.one_night_price'] = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
        }
        if (req.query.rating) {
          const minRating = parseFloat(req.query.rating); // Minimum rating value
          const maxRating = minRating + 1; // Maximum rating value is 1 greater than minimum
          filter.rating = { $gte: minRating.toString(), $lt: maxRating.toString() }; // Convert ratings to strings for comparison
      }
        // Fetch hotels based on the constructed filter object
        console.log(filter)
      
        const hotels = await Hotel.find(filter);
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  },

  // Get hotel by ID
  getHotelById: async (req, res) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      if (!hotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      }
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  

  // Update hotel by ID
  updateHotel: async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['tags', 'slideImages', 'mainImage', 'title', 'location', 'ratings', 'numberOfReviews', 'price', 'delayAnimation', 'city', 'categories','is_publish'];

    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates' });
    }

    try {
      const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!hotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      }
      res.json(hotel);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete hotel by ID
  deleteHotel: async (req, res) => {
    try {
      const hotel = await Hotel.findByIdAndDelete(req.params.id);
      if (!hotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      }
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = hotelController;
