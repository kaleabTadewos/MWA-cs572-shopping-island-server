var express = require('express');
var router = express.Router();
var categoryController = require('../controller/category')

/* GET category listing. */
router.get('/', (req , res , next)=> {
    res.send('here is the response');
}
);
router.get('/category', categoryController.list);
router.post('/category', categoryController.insert);
module.exports = router;