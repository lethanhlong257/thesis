const Owner = require("../models/owner")

module.exports = (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const {city, district} = req.body

    Owner.find()
        .where({"address.city": city})
        .where({"address.district" : district})
        .exec((err, field)=>{
            if(err) return res.json({message: "Error occur when read databse in filter district and city"})

            return res.json(field)
        })
}