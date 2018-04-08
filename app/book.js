let mongoose = require('mongoose');

let bookingSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
    },
    booking_date: {
        type: String,
        required: true,
    },
    reservation_time: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
});

let book = mongoose.model('book', bookingSchema);
module.exports = book;