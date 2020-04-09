const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('created', {
    title: 'testTitle'
  })
})

router.get('/new', (req, res) => {
  const username = req.query.username
  const roomname = req.query.roomname
  const code = Math.floor(Math.random() * 999) + 100

  res.render('created', {
    title: 'testTitle',
    username: username,
    roomname: roomname,
    code: code
  })
})

module.exports = router
