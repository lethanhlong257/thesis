const Owner = require("../models/owner")



module.exports = (req, res) => {
    Owner.find(
        (err, data)=>{
            if (err)  return res.json({message: "Co loi khi lay toan bo san ra"})
            return res.json(data)
        }
    )
}