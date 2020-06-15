const express = require('express');
const router = express.Router();
const unitController = require('../controller/unit.controller');
const subCategoryController = require('../controller/subCategory.controller');

/* User Routes */
router.get('/units', unitController.findAll);
router.post('/units', unitController.insert);
router.put('/units/', unitController.updateById);
router.get('/units/:id', unitController.findById);
router.delete('/units/:id', unitController.removeById);

/* SubCategory Routes*/
router.get('/sub-categories', subCategoryController.findAll);
router.post('/sub-categories', subCategoryController.insert);
router.put('/sub-categories/', subCategoryController.updateById);
router.get('/sub-categories/:id', subCategoryController.findById);
router.delete('/sub-categories/:id', subCategoryController.removeById);
module.exports = router;