const onDisconnect = require('./events/disconnect')

function socket(io) {
  let users = []
  let timesPointsCounted = 0

  io.on('connection', function(socket){
    console.log('a user connected')

    socket.on('disconnect', onDisconnect)

    socket.on('join', (username) => {
      const user = {
        username: username,
        points: 0,
        messages: [],
        ready: false
      }
      users.push(user);
      console.log(users)
      io.emit('new user joined', users)
    })

    socket.on('ready', (username) => {
      users.find(user => user.username === username).ready = true
      io.emit('change in users', users)
      if (allAreReady(users) && users.length === 4) {
        
      function shuffleUsers(users) {
        function randomSort() {
          if (Math.round(Math.random()) === 0) return -1;
          else return 1;
        }
        const shuffledUsers = users.sort(randomSort);
        return shuffledUsers
      }

      function addAnonymousIds(users) {
        let counter = 1
        users.forEach(user => {
          user.id = counter
          counter++
        })
      }

        users = shuffleUsers(users)
        addAnonymousIds(users)
        console.log(users);
        
        io.emit('start', users)
        console.log("let's go")
      }
    })

    socket.on('message', (message, username) => {
      console.log(username, 'sends:', message);
      users.find(user => user.username === username).messages.push(message)
      io.emit('new message', users)      
    })

    socket.on('time is up', () => {
      console.log('time is up');
      io.emit('time to count the points', users)
    })
    
    socket.on('points counted', (points, username) => {
      console.log(`${points} points for ${username}`)
      users.find(user => user.username === username).points = points
      timesPointsCounted++
      if (timesPointsCounted === 4) {
        io.emit('game ended', users)
      }
    })
  })

}

function allAreReady(users) {
  let allReady = true
  users.forEach(user => {
    if (user.ready === false) {
      allReady = false;
    }
  })
  return allReady
}

module.exports = socket