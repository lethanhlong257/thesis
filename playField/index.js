//const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose') 
const jsonParser = bodyParser.json();
var cors = require('cors')
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const connectString = 'mongodb://localhost:27017/playfield';
mongoose.connect(connectString);


mongoose.connection.on('connected', ()=>{
    console.log('connect thanh cong') // eslint-disable-line
});




app.listen(2000, ()=> console.log('hello port 2000'))





/**
 * 
 * this API for register owner of the playfied
 * The require data: 
 * email, password, nameOffield,city,district,
 * ward,street,phone, personalID, photo, nameOwner, description
 * 
 */
app.post('/register/owner', urlencodedParser ,require('./controler/registerOwner'))


/**
 * this API for register field
 * The require data: 
 * ownerID, nameOfYard, discription,
    photo1, photo2, photo3, photo4, photo5,
    typeOfField, price
 */
app.post('/register/field', urlencodedParser ,require('./controler/registerField'))

/**
 * this API forbooking field from the user
 * The require data: 
 * ownerID, userID, fieldID,
    date, month, year, hour, minute, phone, email, note, duration
 * 
 */
app.post('/booking/field', urlencodedParser ,require('./controler/bookingField'))


/**
 * this API for checking the time when the field was ordered
 * The require data: fiedld, year, month, date
 * 
 */
app.get('/booking/check/empty/:fieldID/:year/:month/:date' ,require('./controler/checkEmpty'))


/**
 * this API for retrieve all playfield
 * 
 */
app.get('/playfield/all', require("./controler/getAllPlayfield"))

/**
 * this API for retrieve all playfield
 * 
 */
app.post('/get/playfield/city-district', urlencodedParser, require("./controler/filterPlayfieldByCityDistrict"))

app.get('/get/owner/:id', require("./controler/getOwnerById"))

app.get("/get/playfield/:idOwner", require("./controler/getPlayFiedByOwnerId"))
app.get("/get/playfield/id/:subFieldID", require("./controler/getPlayFieldByID"))
app.get("/history/booking/:userID", require("./controler/getHistoryBookingByUser"))

