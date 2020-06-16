const { Item} = require('../models/item');
const ApiResponse = require('../models/apiResponse');
const {validateId , validateWithOutId , validateWithId} = require('../models/request/item.request');
const ErrorResponse = require('../models/errorResponse');
const { Product } = require('../models/product');
const { Unit } = require('../models/unit');

//CRUD Operations
//Create Operation
exports.insert = async (req, res, next) => {
    const { error } = validateWithOutId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400' , error.details[0].message));
    const category = await Category.findById(req.body.categoryId);
    if(!category) res.status(400).send(new ErrorResponse('400' , 'Invalid Category Id!'));
 
    let newSubCategory = new Item({
        name: req.body.name , 
        category : category
    });
    const item = await Item.create(newSubCategory);
    res.status(201).send(new ApiResponse(201, 'success', item));
};

//Retrive Operations
exports.findById = async (req, res, next) => {
    const { error } = validateId({_id:req.params.id});
    if (error) return res.status(400).send(new ErrorResponse('400' , error.details[0].message));
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send(new ErrorResponse('400' , 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', item));
};

exports.findAll = async (req, res, next) => {
    const subCategories = await Item.find();
    if (!subCategories) return res.status(404).send(new ErrorResponse('400' , 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', subCategories));
}

//Update Operation
exports.updateById = async (req, res, next) => {
    const { error } = validateWithId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400' , error.details[0].message));
    const category = await Category.findById(req.body.categoryId);
    if(!category) res.status(400).send(new ErrorResponse('400' , 'Invalid Category Id!'));
    const item = await Item.findOneAndUpdate(req.params.id,
        {
            name: req.body.name , 
            category: category
        }, 
        { new: true, useFindAndModify: true });
    item.save();
    res.status(200).send(new ApiResponse(200, 'success', item));
};

//Delete Operation
exports.removeById = async (req, res, next) => {
    const { error } = validateId({_id:req.params.id});
    if (error) return res.status(400).send(new ErrorResponse('400' , error.details[0].message));
    const item = await Item.findByIdAndRemove(req.params.id);
    if (!item) return res.status(404).send(new ErrorResponse('400' , 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', item));
};
//test commit
//test commit 2