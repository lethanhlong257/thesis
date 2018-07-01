const Field = require('../models/playfield')

module.exports = (req, res) => {
    if (!req.body) return res.sendStatus(400)

    const {
        ownerID, nameOfYard, discription,
        photo1, photo2, photo3, photo4, photo5,
        typeOfField, price
    } = req.body

    const photo = {
        photo1, photo2, photo3, photo4, photo5
    }

    const field = Field({
        ID: Date.now(), ownerID , nameOfYard, discription, photo,
        typeOfField, price
    })

    if (
        field.ownerID === undefined ||
        field.nameOfYard === undefined || 
        field.typeOfField === undefined ||
        field.price  === undefined

    ) 
    return res.json({ status: false ,message: 'thieu thong tin dat san xin vui long dang ki lai' })

    field.save( err => {
        if (err) return res.json(err);

        // nodeMailer(owner.email,
        //     "Đăng kí tài khoản thành công",
        //     "Bạn đã đăng kí thành công "+
        //     owner.email+
        //     " sân của bạn vào hệ thống của chúng tôi")

        res.json({
            message: "dang ki san thanh cong ",
            infor: field
        })
    })

}