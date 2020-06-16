const { Product} = require('../models/product');
const ApiResponse = require('../models/apiResponse');
const {validateId , validateWithOutId , validateWithId} = require('../models/request/product.request');
const ErrorResponse = require('../models/errorResponse');
const { SubCategory } = require('../models/subCategory');

//CRUD Operations
//Create Operation
exports.insert = async (req, res, next) => {
    const { error } = validateWithOutId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400' , error.details[0].message));
    const subCategory = await SubCategory.findById(req.body.subCategoryId);
    if(!subCategory) res.status(400).send(new ErrorResponse('400' , 'Invalid Sub Category Id!'));
 
    let newProduct = new Product({
        name: req.body.name , 
        userId: userId , 
        description: description ,
        imageUrl: imageUrl,
        subCategory : subCategory
    });
    const product = await Product.create(newProduct);
    res.status(201).send(new ApiResponse(201, 'success', product));
};

//Retrive Operations
exports.findById = async (req, res, next) => {
    const { error } = validateId({_id:req.params.id});
    if (error) return res.status(400).send(new ErrorResponse('400' , error.details[0].message));
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send(new ErrorResponse('400' , 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', product));
};

exports.findAll = async (req, res, next) => {
    const products = await Product.find();
    if (!products) return res.status(404).send(new ErrorResponse('400' , 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', products));
}

//Update Operation
exports.updateById = async (req, res, next) => {
    const { error } = validateWithId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400' , error.details[0].message));
    const subCategory = await SubCategory.findById(req.body.subCategoryId);
    if(!subCategory) res.status(400).send(new ErrorResponse('400' , 'Invalid Sub Category Id!'));
    const product = await Product.findOneAndUpdate(req.params.id,
        {
            name: req.body.name , 
            userId: userId , 
            description: description ,
            imageUrl: imageUrl,
            subCategory : subCategory
        }, 
        { new: true, useFindAndModify: true });
    Product.save();
    res.status(200).send(new ApiResponse(200, 'success', product));
};

//Delete Operation
exports.removeById = async (req, res, next) => {
    const { error } = validateId({_id:req.params.id});
    if (error) return res.status(400).send(new ErrorResponse('400' , error.details[0].message));
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) return res.status(404).send(new ErrorResponse('400' , 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', product));
};