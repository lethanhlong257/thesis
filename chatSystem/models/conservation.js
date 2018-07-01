const mongoose = require('mongoose');
const Conservation = new mongoose.Schema({

    sender: {
        type: String,
        require: true
    },
    reciever: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    time: {
        type: Number,
        require: true
    }

});

module.exports = mongoose.model('Conservation', Conservation);