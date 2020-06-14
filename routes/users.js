var express = require('express');
var router = express.Router();
var userController = require('../controller/User')

/* GET users listing. */
router.post('/user', userController.registerUser)
module.exports = router;