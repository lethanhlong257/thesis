const Owner = require("../models/owner")
module.exports = (req, res)=>{
    const id =req.params.id
    
    Owner.findOne()
    .where("ID", id)
    .exec((err, data)=>{
        if(err) return res.json({message: "Error occur: getOwnerID when reading database"})
        
        return res.json(data)
    })
}