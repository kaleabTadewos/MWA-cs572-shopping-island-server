const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const userController = require('../controller/User');
const admin = require('../middleware/admin');

/* Get a user. */
router.get('/user/me', [auth, admin], userController.getUser);
/* Register a user user. */
router.post('/user', auth, userController.registerUser);
module.exports = router;