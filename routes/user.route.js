const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const userController = require('../controller/user.controller');
//const admin = require('../middleware/admin');

/* Get a user. */
//router.get('/me', userController.getUser);
/* Register a user user. */
// router.post('/', userController.registerUser);
// module.exports = router;