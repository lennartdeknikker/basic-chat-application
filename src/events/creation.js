function onCreation(message, io){
  console.log('new room created: ' + message)
  io.emit('chat message', message)
}

module.exports = onCreation