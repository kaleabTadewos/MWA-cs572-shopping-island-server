const { Item } = require('../models/item');
const ApiResponse = require('../models/apiResponse');
const {validateId , validateWithOutId , validateWithId} = require('../models/request/item.request');
const ErrorResponse = require('../models/errorResponse');
//const { SubCategory } = require('../models/subCategory');

//CRUD Operations
//Create Operation
exports.insert = async (req, res, next) => {
    res.status(201).send(new ApiResponse(201, 'success', {}));
};

//Retrive Operations
exports.findById = async (req, res, next) => {
    res.status(200).send(new ApiResponse(200, 'success', {}));
};

exports.findAll = async (req, res, next) => {
    res.status(200).send(new ApiResponse(200, 'success', {}));
}

//Update Operation
exports.updateById = async (req, res, next) => {
    res.status(200).send(new ApiResponse(200, 'success', {}));
};

//Delete Operation
exports.removeById = async (req, res, next) => {
    res.status(200).send(new ApiResponse(200, 'success', {}));
};