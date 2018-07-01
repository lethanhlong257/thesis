const Booking = require('../models/booking')
const request = require('request')
const axios = require('axios')
const requestPromise = require('request-promise');


module.exports = async (req, res) => {
    if (!req.body) return res.sendStatus(400)

    const {
        ownerID, userID, fieldID,
        date, month, year, hour, minute, phone, email, note, duration, unitPrice, totalPrice
    } = req.body

    const time = { date, month, year, hour, minute }

    const options = {
        uri: "http://localhost:2000/booking/check/empty/" + fieldID + "/" + year + "/" + month + "/" + date,
        qs: {
            access_token: "" // -> uri + '?access_token=xxxxx%20xxxxx'
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };

    const orderedTime = await requestPromise(options)

    let check = false

    await orderedTime.forEach(e => {
        if (e === time.hour + time.minute + "") {
            check =  true
        }
    });

    if (check) {
        return res.json({message: "Bi trung gio", status: false})
    } else {
        const booking = Booking({
            ID: Date.now(), ownerID, userID, fieldID,
            time, phone, email, note, duration, unitPrice, totalPrice
        })

        if (
            booking.ownerID === undefined ||
            booking.userID === undefined ||
            booking.fieldID === undefined ||
            booking.time === undefined ||
            booking.phone === undefined ||
            booking.email === undefined ||
            booking.duration === undefined
        )
            return res.json({ status: false, message: 'thieu thong tin dat san xin vui long dang ki lai' })

        booking.save(err => {
            if (err) return res.json(err);
            res.json({
                status: true,
                message: "dang ki san thanh cong ",
                infor: booking
            })
        })
    }
    
}

