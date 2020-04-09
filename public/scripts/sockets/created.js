const code = Math.floor(Math.random() * 999) + 100
const username = document.querySelector('#username').innerText
const codeTextElement = document.querySelector('#code')
codeTextElement.innerText = code

const socket = io()

socket.on('connect', function() {
  const newRoomData = {
    code: code,
    username: username,
    id: socket.id
  }
  console.log(newRoomData);
  socket.emit('new room created', newRoomData)
})


socket.emit('test message', )

