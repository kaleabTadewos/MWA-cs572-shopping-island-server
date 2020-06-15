const express = require('express');
const router = express.Router();
const unitController = require('../controller/unit');
//const admin = require('../middleware/admin');

/* Get a user. */
router.get('/units', unitController.findAll);
router.post('/units', unitController.insert);
router.put('/units/', unitController.updateById);
router.get('/units/:id', unitController.findById);
router.delete('/units/:id', unitController.removeById);
module.exports = router;