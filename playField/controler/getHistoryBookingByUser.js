const Booking = require("../models/booking")

module.exports = (req, res)=>{
    let userID = req.params.userID
    console.log(userID);
    Booking.find()
        .where("userID", userID)
        .exec((err, bookings)=>{
            if (err) return res.json(err)
            return res.json(bookings)
        })
}