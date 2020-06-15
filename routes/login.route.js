var express = require('express');
var router = express.Router();
var loginController = require('../controller/auth.controller')

/* GET users listing. */
router.post('/login', loginController.login)
module.exports = router;