const onDisconnect = require('./events/disconnect')
const onChatMessage = require('./events/chatmessage')

function socket(io) {
  io.on('connection', function(socket){
    console.log('a user connected')
    socket.on('disconnect', onDisconnect)
    socket.on('chat message', (message) => onChatMessage(message, io))
  })
}

module.exports = socket