const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  // res.sendFile(INDEX, { root: rootPath })
  res.render('index', {
    title: 'testTitle'
  })
})

module.exports = router
