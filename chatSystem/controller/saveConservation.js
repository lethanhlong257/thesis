const Conservation = require("../models/conservation")

module.exports = function (chat) {
    let sender = chat.userSender
    let reciever = chat.userReciever
    let message = chat.message
    let time = Date.now()
    const conservation = Conservation({ sender, reciever, message, time })
    
    conservation.save(err => {
        if (err) {
            throw err
        } else {
            return { message : "Sent"}
        }
    })
}