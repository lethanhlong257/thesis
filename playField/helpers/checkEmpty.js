const Booking = require('../models/booking')



module.exports = (fieldID, date, month, year, callback) => {
    const _30minutes = [
        '0000', '0030', '0100', '0130', '0200', '0230', '0300', '0330',
        '0400', '0430', '0500', '0530', '0600', '0630', '0700', '0730',
        '0800', '0830', '0900', '0930', '1000', '1030', '1100', '1130',
        '1200', '1230', '1300', '1330', '1400', '1430', '1500', '1530',
        '1600', '1630', '1700', '1730', '1800', '1830', '1900', '1930',
        '2000', '2030', '2100', '2130', '2200', '2230', '2300', '2330'
    ]
    let emptyTime = [];
    Booking.find()
        .where("fieldID", fieldID)
        .where("time.year", year)
        .where("time.month", month)
        .where("time.date", date)
        .exec((err, result) => {
            if (err) return err
            
            result.forEach(e => {
                let hour_minute = e.time.hour + '' + e.time.minute;
                _30minutes.forEach(e => {
                    if (e !== hour_minute) {
                        emptyTime.push(e)
                    }
                })
            })
            return emptyTime
            callback(emptyTime)
            
        })
}