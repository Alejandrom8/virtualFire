var express = require('express')
var router = express.Router()
const fireController = require('../controllers/fire.controller')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index')
})

router.get('/wildfires', fireController.getLocalFires)

module.exports = router
