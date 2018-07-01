const mongoose = require('mongoose');

const playField = new mongoose.Schema({
    ID: {
        unique: true,
        type: Number,
        require: true
    },
    ownerID: {
        type: String,
        require: true
    },
    nameOfYard: {
        type: String,
        require: true
    },
    discription: {
        type: String,
        require: true
    },
    photo: {
        photo1: String,
        photo2: String,
        photo3: String,
        photo4: String,
        photo5: String
    },
    typeOfField: {
        type: String
    },
    price: Number

});

module.exports = mongoose.model('playField', playField);