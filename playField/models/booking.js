const mongoose = require('mongoose');

const booking = new mongoose.Schema({
    ID: {
        unique: true,
        type: Number,
        require: true
    },
    ownerID: {
        type: String,
        require: true
    },
    userID: {
        type: String,
        require: true
    },
    fieldID: {
        type: String,
        require: true
    },
    time: {
        date: String,
        month: String,
        year: String,
        hour: String,
        minute: String
    },
    duration: {
        type: Number,
        require: true
    },
    note: String,
    phone: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    otherName: String,
    unitPrice: Number,
    totalPrice: Number

});

module.exports = mongoose.model('booking', booking);