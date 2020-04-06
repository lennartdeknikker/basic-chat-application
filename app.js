const express = require('express')
var http = require('http')
var socketIO = require('socket.io')

const PORT = process.env.PORT || 3000
const INDEX = './views/index.html'


const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`))

const io = socketIO(server)

io.on('connection', function(socket){
    console.log('a user connected')
    socket.on('disconnect', function(){
        console.log('user disconnected')
    })
    socket.on('chat message', function(msg){
        console.log('message: ' + msg)
        io.emit('chat message', msg)
    })
})