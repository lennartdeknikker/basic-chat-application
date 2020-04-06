function onChatMessage(message, io){
  console.log('message: ' + message)
  io.emit('chat message', message)
}

module.exports = onChatMessage