var express = require('express');
var router = express.Router();
var categoryController = require('../controller/category')

/* GET category listing. */
router.post('/categories', categoryController.insert);
router.get('/categories', categoryController.findAll);
router.get('/categories/:id', categoryController.findById);
router.put('/categories', categoryController.updateById);
router.delete('/categories/:id', categoryController.removeById);
module.exports = router;