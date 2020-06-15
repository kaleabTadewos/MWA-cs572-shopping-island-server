const express = require('express');
const router = express.Router();
const unitController = require('../controller/unit.controller');
const shippingAddressController = require('../controller/shippingAddress.controller');
const pointCalculatorControler = require('../controller/pointCalculator.controller');
const subCategoryController = require('../controller/subCategory.controller');
const categoryController = require('../controller/category.controller');

/* units Routes */
router.get('/units', unitController.findAll);
router.post('/units', unitController.insert);
router.put('/units/', unitController.updateById);
router.get('/units/:id', unitController.findById);
router.delete('/units/:id', unitController.removeById);

/* Category Routes*/
router.get('/categories', categoryController.findAll);
router.post('/categories', categoryController.insert);
router.put('/categories/', categoryController.updateById);
router.get('/categories/:id', categoryController.findById);
router.delete('/categories/:id', categoryController.removeById);

/* SubCategory Routes*/
router.get('/sub-categories', subCategoryController.findAll);
router.post('/sub-categories', subCategoryController.insert);
router.put('/sub-categories/', subCategoryController.updateById);
router.get('/sub-categories/:id', subCategoryController.findById);
router.delete('/sub-categories/:id', subCategoryController.removeById);

/* Shipping Address Routes*/
router.get('/shipping-address', shippingAddressController.findAll);
router.post('/shipping-address', shippingAddressController.insert);
router.put('/shipping-address/', shippingAddressController.updateById);
router.get('/shipping-address/:id', shippingAddressController.findById);
router.delete('/shipping-address/:id', shippingAddressController.removeById);

/* Shipping Address Routes*/
router.get('/point-calculator', pointCalculatorControler.findAll);
router.post('/point-calculator', pointCalculatorControler.insert);
router.put('/point-calculator', pointCalculatorControler.updateById);
router.get('/point-calculator/:id', pointCalculatorControler.findById);
router.delete('/point-calculator/:id', pointCalculatorControler.removeById);



module.exports = router;