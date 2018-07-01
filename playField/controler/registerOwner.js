const Owner = require('../models/owner')

module.exports = (req, res) => {
    if (!req.body) return res.sendStatus(400)

    const {
        email, password, nameOffield,
        city,district,ward,street,phone, personalID, photo, nameOwner, description
    } = req.body

    const address = {
        city, district, ward, street
    }

    const owner = Owner({
        ID: Date.now(), nameOwner , password, nameOffield, email,
        address, phone, personalID, photo, description
    })

    if (
        owner.nameOwner === undefined ||
        owner.password === undefined || 
        owner.nameOffield === undefined ||
        owner.email === undefined ||
        owner.address  === undefined||
        owner.phone  === undefined|| 
        owner.personalID  === undefined
    ) 
    return res.json({ status: false ,message: 'thieu thong tin dat san xin vui long dang ki lai' })

    owner.save( err => {
        if (err) return res.json(err);

        // nodeMailer(owner.email,
        //     "Đăng kí tài khoản thành công",
        //     "Bạn đã đăng kí thành công "+
        //     owner.email+
        //     " sân của bạn vào hệ thống của chúng tôi")

        res.json({
            message: "dang ki san thanh cong ",
            infor: {
                nameOwner: owner.nameOwner,
                nameField: owner.nameOffield,
                email: owner.email,
                address: owner.address,
                phone: owner.phone,
                personalID: owner.personalID,
                photo: owner.photo,
                description: owner.description
            }
        })
    })

}