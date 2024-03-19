const mongoose = require('mongoose');

const { Schema } = mongoose;

const hotelSchema = new Schema({
    name: { type: String, required: true },
    // roomtype: { type: String },
    location: { type: String },
    images: [{
        url: { type: String },
        mediaType: { type: String }
    }],
    room: [{
        roomtype: { type: String },
        images: [{
            url: { type: String },
            mediaType: { type: String }
        }],
        benifit: [{ type: String }],
        sleep: { type: String },
        one_night_price: { type: Number, default: null }, // Default value set to null
        tax_charges:{type:Number},
        total_room: { type: Number, default: null }, // Default value set to null
        already_booking: { type: Number, default: null }, // Default value set to null
        is_primary: { type: Boolean, default: false },
        room_list: [{
            roomnumber: {type: String },
            booking: [{
                booking_date: { type: String },
                checkin_time: { type: String },
                checkout_time: { type: String },
                checkin_date: { type: String },
                checkout_date: { type: String },
                // user_id: {
                //     type: mongoose.Schema.Types.ObjectId,
                //     ref: 'User',
                    
                // }
            }]
        }],
        facility: [{ type: String }]
    }],
    hotel_overview: { type: String },
    rating: { type: String },
    review: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        comment: { type: String },
        rating: { type: Number },
        like: { type: Number },
        dislike: { type: Number },
        media: [{
            url: { type: String }
        }],
        created_at: { type: Date }
    }],
    hotel_facility: [{
        type: String,
        enum: [
            "Breakfast Included",
            "Romantic",
            "Airport Transfer",
            "WiFi Included",
            "Non-smoking rooms",
            "Parking",
            "Kitchen",
            "Living Area",
            "Safety & security",
            "5 Star"
        ],
        required: true
    }],
    Property_highlights: [{
        name: { type: String },
        icon: { type: String ,default:"https://cdn-icons-png.flaticon.com/512/1160/1160358.png"}
    }],
    geoLocation: {
        latitude: { type: Number, default: 0 },
        longitude: { type: Number, default: 0 }
    },
    hoteladdress: [{
        country: { type: String },
        state: { type: String },
        city: { type: String },
        other: { type: String },
        postal_code: { type: String },
    }],
    deals: [{
        type: String,
        enum: ['Free cancellation', 'Reserve now, pay at stay', 'Properties with special offers'],
        required: true
    }],
    amenities: [{
        type: String,
        enum: [
            
            "Home Theatre",
            "Spa Tub",
            "Smoking Room",
            "Kitchenette",
            "Private Pool",
            "Bathtub",
            "Balcony",
            "Cook & Butler Service",
            "Interconnected Room",
            "Fireplace",
            "Jacuzzi",
            "Living Area",
            "Heater"
        ],
        required: true
    }],
    style: [{
        type: String,
        enum: [
            "Budget",
            "Mid-range",
            "Luxury",
            "Family-friendly",
            "Business"
        ],
        required: true,
    }],
    faq: [
        {
            question: { type: String },
            answer: { type: String }
        }
    ]
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
