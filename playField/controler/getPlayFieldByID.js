const Playfield = require("../models/playfield")

module.exports = (req, res) => {
    const id = req.params.subFieldID
    console.log(id);
    Playfield.findOne({ID: id}, (err, subField)=>{
        if (err) return res.json(err)
        return res.json(subField)
    })
        
}