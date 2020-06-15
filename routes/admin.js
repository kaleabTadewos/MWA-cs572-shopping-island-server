const express = require('express');
const router = express.Router();
const unitController = require('../controller/unit');
//const admin = require('../middleware/admin');

/* Get a user. */
router.get('/unit', unitController.findAll);
/* Register a user user. */
router.post('/unit', unitController.insert);
module.exports = router;