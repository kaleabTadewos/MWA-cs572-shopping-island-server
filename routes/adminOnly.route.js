const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

/* GET a user. */
router.post('/users', userController.findById);
module.exports = router;