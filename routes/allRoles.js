const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

/* GET a user. */
router.get('/users', userController.findAll);
module.exports = router;