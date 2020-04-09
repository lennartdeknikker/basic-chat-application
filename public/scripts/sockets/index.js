import countdown from './countdown.js'

let username = ''

const socket = io()

socket.on('message', (message) => {
  console.log(message)
})

socket.on('error message', (error) => {
  console.log(error)
})

socket.on('new user joined', (users) => {
  updateUserList(users)
})

socket.on('change in users', (users) => {
  updateUserList(users)
})

socket.on('start', (users) => {
  function updateName(username) {
    const yourNameElement = document.querySelector('#your-name')
    yourNameElement.innerText = username
  }

  function createSelects(users) {
    const answerForm = document.querySelector('#form-answers')
    const filteredUsers = getOtherData(users)
    for (let i=0; i < 3; i++) {
      const select = document.createElement('select')
      select.name = `select${i+1}`
      select.dataset.answer = users[i].id
      select.id = `select${i+1}`
      for (let user of filteredUsers) {
        let option = document.createElement('option')
        option.innerText = user.username
        select.appendChild(option)
      }
      answerForm.appendChild(select)
    }
  }

  
  if (getOwnIndex(users) === 0) countdown.init(1, whenTimerEnds)
  else countdown.init(1)
  updateName(username)
  createSelects(users)
  showSection(3)  
})

socket.on('new message', users => {
  function updateMessages(users) {
    function populateOwnMessages(userData) {
      const ownMessageList = document.querySelector('#own-messages')
      ownMessageList.innerHTML = ''
      for (let message of userData.messages) {
        const newLi = document.createElement('li');
        newLi.innerText = message
        ownMessageList.appendChild(newLi)
      }
    }
    function populateOtherMessages(userData) {
      const messageLists = document.querySelectorAll('.other-messages')
      
      for (let i=0 ; i < userData.length; i++) {
        const messages = userData[i].messages
        
        const list = messageLists[i]
        list.innerHTML = ''       
        for (let message of messages) {
          const newLi = document.createElement('li');
          newLi.innerText = message
          list.appendChild(newLi)
      }

      }}
    
    const ownUserData = getOwnData(users)
    const otherData = getOtherData(users)
    
    populateOwnMessages(ownUserData)
    populateOtherMessages(otherData)
  }
  
  updateMessages(users)
})

socket.on('time to count the points', users => {
  const selectElements = document.querySelector('#form-answers').querySelectorAll('select')
  const otherUsers = getOtherData(users)

  let points = 0

  for (let i=0; i < 3; i++) {
    if (otherUsers[i].username === selectElements[i].value) points++ 
  }
  
  socket.emit('points counted', points, username)

})

socket.on('game ended', users => {
  showSection(4)
  const scoresList = document.querySelector('#scores')
  let highscore = 0
  let winner = ''
  for (let user of users) {
    if (user.points > highscore) {
      highscore = user.points
      winner = user.username
    }
    const newLi = document.createElement('li')
    newLi.innerText = `${user.username} guessed ${user.points} name(s) right`
    scoresList.appendChild(newLi)
  }
  const winnerText = document.querySelector('#winner')
  winnerText.innerText = `The winner is ${winner}!!!`
})

function updateUserList(users) {
  const listOfParticipants = document.querySelector('#participants-list')
  listOfParticipants.innerHTML = ''
  for (let user of users) {
    const newLi = document.createElement('li')
    const readyText = user.ready === true ? 'ready' : 'not ready'
    newLi.innerText = `${user.username} (${readyText})`
    listOfParticipants.appendChild(newLi)
  }
}

// join room form
const formJoinRoom = document.querySelector('#form-join')
formJoinRoom.addEventListener('submit', joinRoom)

function joinRoom() {
  event.preventDefault()
  username = formJoinRoom.elements.username.value

  if (validate(formJoinRoom)) {
    socket.emit('join', username)
    showSection(2)
  }

}

// send message
const messageForm = document.querySelector('#form-message')
messageForm.addEventListener('submit', sendMessage) 

function sendMessage() {
  event.preventDefault()
  if (validate(messageForm)) {
    const message = messageForm.elements.message.value
    socket.emit('message', message, username)
  }
}

// form validation
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

// ready button
function setReady() {
  socket.emit('ready', username)
}

const readyButton = document.querySelector('#ready-button')
readyButton.addEventListener('click', setReady)

function showSection(number) {
  const sections = document.querySelectorAll('section')
  for (let i =0; i < sections.length; i++) {
    if (i === number-1) sections[i].classList.remove('hidden')
    else sections[i].classList.add('hidden')
  }
}

function getOwnData(users) {
  const ownIndexInArray = getOwnIndex(users)  
  const ownUserData = users[ownIndexInArray]
  return ownUserData
}

function getOtherData(users) {
  const isMe = (element) => element.username === username
  const ownIndexInArray = users.findIndex(isMe)  
  users.splice(ownIndexInArray, 1)
  return users
}

function whenTimerEnds() {
  socket.emit('time is up')
}

function getOwnIndex(users) {
  const isMe = (element) => element.username === username
  return users.findIndex(isMe)
}