const socket = io()
const form = document.querySelector('form')
const inputElement = document.querySelector('#m')

form.addEventListener('submit', sendMessage)

function sendMessage(event) {
    event.preventDefault()
    socket.emit('chat message', inputElement.value)
}

socket.on('chat message', function(message) { appendMessage(message) })

function appendMessage(message) {
    const messageList = document.querySelector('#messages')
    const newLi = document.createElement('li')
    newLi.innerText = message
    messageList.appendChild(newLi)
}