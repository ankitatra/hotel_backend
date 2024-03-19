const mongoose = require('mongoose');

const tourDetailsSchema = new mongoose.Schema({
  uuid: {
    type: String,
   
  },
  name: {
    type: String,
   
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vendors',
  },
  location: {
    type: String,
   
  },
  isGroup:{
    type:Boolean
  },
  images: [
    {
      type: String, 
    },
  ],
  cost: {
    type: String,
   
  },
  duration: {
    type: String,
   
  },
  group: {
    type: Boolean,
    default: false,
  },
  groupSize: {
    type: Number,
    // Add any specific validation for group size if needed
  },
  transportation: {
    type: Boolean,
    default: false,
  },
  cancellationPolicy: {
    type: String,
    
  },
  overview: {
    type: String,
   
  },
  languages: [
    {
      type: String,
    },
  ],
  cancelPolicy: {
    type: String,
   
  },
  highlights: [
    {
      type: String,
    },
  ],
  whatsIncluded: [
    {
      side: {
        type: String,
      },
      content: {
        type: String,
      },
    },
  ],
  // Add more fields as needed
}
);

const Tour = mongoose.model('Tour', tourDetailsSchema);

module.exports = Tour;
