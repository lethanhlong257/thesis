const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const connectString = "mongodb://localhost:27017/chat";
mongoose.connect(connectString);
mongoose.connection.on("connected", () => {
    console.log('connect thanh cong') // eslint-disable-line
});

mongoose.connection.on("disconnected", () => {
    console.log('ngat ket noi mongo') // eslint-disable-line
});

const Conservation = require("./models/conservation")


app.set('port', process.env.PORT || 4000) // eslint-disable-line


server.listen(app.get("port"), () => {
    console.log('server started at port ' + app.get('port')) // eslint-disable-line
});


const checkOnline = require("./controller/checkOnline")

let userOnline=[];
let username;

io.on("connection", (socket) => {
    
    socket.on("disconnect", function () {
        if (socket.Username) {
            userOnline.splice(
                findSocketUsername(userOnline, socket.id), 1
            );
        }
        
        //io.sockets.emit('sever-send-users', userOnline)
        //console.log(socket.id + " : Disconnected");
    });

    // register chat box
    socket.on('client-send-chat-register', function (name) {
        // if (checkOnline(userOnline, name)) {
        //     name = name + '1';
        // }
        
        userOnline.push({
            socketid: socket.id,
            socketUsername: name
        });
        socket.Username = name;
        username = name;
        socket.emit('server-send-register-success', name);
        io.sockets.emit('sever-send-users-online', userOnline);
       
    });

    socket.on("take conservation", (users) => {
        let historicalConservation = [];
        
        Conservation.find()
            .exec( async (err, conservations) => {
                if (err) {
                    throw err
                } else {
                    await conservations.forEach( conser => {
                        if ((conser.sender === users.userSender && conser.reciever === users.userReciever) || 
                            (conser.sender === users.userReciever && conser.reciever === users.userSender)    
                    ) {
                        historicalConservation.push(conser)
                        }
                    })
                    socket.emit("server return historical conservation", historicalConservation)
                }
            })
    })

    socket.on("user send message", chat => {
        let sender = chat.userSender
        let reciever = chat.userReciever
        let message = chat.message
        let time = Date.now()
        const conservation = Conservation({ sender, reciever, message, time })

        conservation.save(err => {
            if (err) {
                throw err
            } else {
                socket.emit("server return lastest conservation", conservation)
                console.log("User send message: " + conservation);
                const u = checkOnline(userOnline, reciever)
                if (u) {
                    socket.to(u.socketid).emit("server return lastest conservation", conservation)
                }
            }
        })
    })

    socket.on("take user conservation list", username => {
        Conservation.find()
            .where("sender", username)
            .distinct("reciever")
            .exec((err, userConservationList) => {
                if (err) {
                    throw err
                } else {
                    socket.emit("server return userConservationList", userConservationList)
                }
            })
    })

    socket.on("take user conservation list when chat btn pressed", userSender => {
        Conservation.find()
            .where("sender", userSender)
            .distinct("reciever")
            .exec((err, userConservationList) => {
                if (err) {
                    throw err
                } else {
                    socket.emit("server return list of reciver when chat btn pressed", userConservationList)
                }
            })
    })


});


// custom 500 page
app.use(function (err, req, res, next) {
    res.type("text/plain");
    res.status(500);
    res.send("500 - Server Error");
    next();
});


// custom 404 page
app.use(function (req, res) {
    res.type("text/plain");
    res.status(404);
    res.send("404 - Not Found");
});

function findSocketUsername(arrayUsernameAndID, socketid) {
    let index
    for (let i = 0; i < arrayUsernameAndID.length; i++) {
        const user = arrayUsernameAndID[i];
        if (socketid === user.socketid) {
            index = i
            break
        }
    }
    return index
}

