const { Address, validateId, validateWithOutId, validateWithId } = require('../models/address');
const ApiResponse = require('../models/apiResponse');
const ErrorResponse = require('../models/errorResponse');

//CRUD Operations
//Create Operation
exports.insert = async(req, res, next) => {
    const { error } = validateWithOutId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const address = await Address.create(req.body);
    res.status(201).send(new ApiResponse(201, 'success', address));
};

//Retrive Operations
exports.findById = async(req, res, next) => {
    const { error } = validateId({ _id: req.params.id });
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const address = await Address.findById(req.params.id);
    if (!address) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', address));
};

exports.findAll = async(req, res, next) => {
    const address = await Address.find();
    if (!address) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', address));
}

//Update Operation
exports.updateById = async(req, res, next) => {
    const { error } = validateWithId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const address = await Address.findOneAndUpdate(req.params.id, {
        state: req.body.state,
        city: req.body.city,
        street: req.body.street,
        zipCode: req.body.zipCode
    }, { new: true, useFindAndModify: true });
    console.log(address);
    address.save();
    res.status(200).send(new ApiResponse(200, 'success', address));
};

//Delete Operation
exports.removeById = async(req, res, next) => {
    const { error } = validateId({ _id: req.params.id });
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const address = await Address.findByIdAndRemove(req.params.id);
    if (!address) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', address));
};