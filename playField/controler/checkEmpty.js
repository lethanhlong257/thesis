const Booking = require('../models/booking')
const checkEmpty = require('../helpers/checkEmpty')

module.exports = (req, res) => {
    if (!req.params) return res.sendStatus(400)

    const { fieldID, date, month, year } = req.params
    const _30minutes = [
        '0000', '0030', '0100', '0130', '0200', '0230', '0300', '0330',
        '0400', '0430', '0500', '0530', '0600', '0630', '0700', '0730',
        '0800', '0830', '0900', '0930', '1000', '1030', '1100', '1130',
        '1200', '1230', '1300', '1330', '1400', '1430', '1500', '1530',
        '1600', '1630', '1700', '1730', '1800', '1830', '1900', '1930',
        '2000', '2030', '2100', '2130', '2200', '2230', '2300', '2330'
    ]
    let orderedTime = [];
    Booking.find()
        .where("fieldID", fieldID)
        .where("time.year", year)
        .where("time.month", month)
        .where("time.date", date)
        .exec((err, result) => {
            if (err) return err
            
            result.forEach(e => {
                let hour_minute = e.time.hour + '' + e.time.minute;
                
                let duration = e.duration/30;
                for (let i = 0; i < _30minutes.length; i++) {
                    let element = _30minutes[i];
                    let point = i;
                    if (element === hour_minute) {
                        for (let index = 1; index <= duration; index++) {
                            element = _30minutes[point];
                            orderedTime.push(element);
                            point++;
                        }
                    }
                }
            })
            return res.json(orderedTime)
        })
    
}