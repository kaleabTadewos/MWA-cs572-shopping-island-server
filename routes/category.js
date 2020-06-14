var express = require('express');
var router = express.Router();
var categoryController = require('../controller/category')

/* GET category listing. */
router.get('/', (req , res , next)=> {
    res.send('here is the response');
}
);

router.post('/categorys', categoryController.insert);
router.get('/categorys', categoryController.findAll);
router.get('/categorys/:id', categoryController.findById);
router.put('/categorys', categoryController.updateById);
module.exports = router;