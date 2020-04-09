const socket = io()

socket.on('message', (message) => {
  console.log(message)
})

socket.on('error message', (error) => {
  console.log(error)
})


function validate(form) {
  const formElements = form.querySelectorAll('textarea, input')
      let allIsRight = true
      for (const element of formElements) {
          const value = element.value
          if (!value) {
              event.preventDefault()
              element.placeholder = 'Sorry, this field is required.'
              element.classList.add('wrong-input')
              allIsRight = false
          }
      }
  return allIsRight ? true : false
}

const formCreateNew = document.querySelector('#form-create-new')
formCreateNew.addEventListener('submit', createNewRoom)

function createNewRoom() {
  event.preventDefault()
  const username = formCreateNew.elements.username.value
  const roomname = formCreateNew.elements.roomname.value
  const code = Math.floor(Math.random()*(999 - 100 + 1)) + 100

  const newRoomData = {
    username: username,
    roomname: roomname,
    code: code
  }

  console.log(newRoomData)
  if (validate(formCreateNew)) {
    socket.emit('creation', newRoomData)
  }
}

const formJoinRoom = document.querySelector('#form-join')
formJoinRoom.addEventListener('submit', joinRoom)

function joinRoom() {
  event.preventDefault()
  const username = formJoinRoom.elements.username.value
  const code = formJoinRoom.elements.code.value

  const userData = {
    username: username,
    code: code
  }

  if (validate(formJoinRoom)) {
    socket.emit('join', userData)
  }

}