
const mongoose = require('mongoose');

const Owner = new mongoose.Schema({
    ID: {
        unique: true,
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    nameOffield: {
        type: String,
        required: true
    },
    address: {
        city: String,
        district: String,
        ward: String,
        street: String
    },
    phone: {
        type: String,
        required: true
    },
    personalID: {
        type: String,
        require: true
   
    },
    photo: {
        type: String
    }, 
    nameOwner: {
        type: String,
        required: true
    },
    description: String

});

module.exports = mongoose.model('owner', Owner);