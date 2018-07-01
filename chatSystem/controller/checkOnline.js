module.exports = function checkOnline (userOnline, user) {
    let flat = undefined
    for (let i = 0; i < userOnline.length; i++) {
        const u = userOnline[i];
        if (u.socketUsername===user) {
            flat = u
            break
        }
    }
    return flat
}