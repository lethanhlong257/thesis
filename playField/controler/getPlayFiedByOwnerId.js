const Playfield = require("../models/playfield")

module.exports = (req, res) => {
    const ownerID = req.params.idOwner
    
    Playfield.find()
        .where("ownerID", ownerID)
        .exec((err, value)=>{
            if(err) return res.json({message: "Error occur: read database in getplayFiedByOwnerID"})
            
            return res.json(value)
        })
}