const onDisconnect = require('./events/disconnect')

function socket(io) {
  io.on('connection', function(socket){
    console.log('a user connected')
    socket.on('disconnect', onDisconnect)

    socket.on('creation',  (newRoomData) => {
      console.log('new room created: ' + newRoomData.code)
      socket.join(`${newRoomData.code}`)
        console.log(io.sockets.adapter.rooms)        
    })
    socket.on('join', (userData) => {
      function roomExists(room) {
        const allRooms = io.sockets.adapter.rooms
        return allRooms[`${room}`] !== undefined
      }

      if (roomExists(userData.code)) {
        socket.join(`${userData.code}`)
        socket.to(`${userData.code}`).broadcast.emit('message', `${userData.username} is connected to room ${userData.code}`)
        console.log('message', `${userData.username} is connected to room ${userData.code}`)
      } else {
        socket.emit('error message', 'This room does not exist.')
      }
      return      
    })
  })

}

module.exports = socket