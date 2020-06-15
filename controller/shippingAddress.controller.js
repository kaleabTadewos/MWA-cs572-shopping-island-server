const { ShippingAddress, validateId, validateWithOutId, validateWithId } = require('../models/shippingAddress');
const ApiResponse = require('../models/apiResponse');
const ErrorResponse = require('../models/errorResponse');

//CRUD Operations
//Create Operation
exports.insert = async(req, res, next) => {
    const { error } = validateWithOutId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const shippingAddress = await ShippingAddress.create(req.body);
    res.status(201).send(new ApiResponse(201, 'success', shippingAddress));
};

//Retrive Operations
exports.findById = async(req, res, next) => {
    const { error } = validateId({ _id: req.params.id });
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const shippingAddress = await ShippingAddress.findById(req.params.id);
    if (!shippingAddress) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', shippingAddress));
};

exports.findAll = async(req, res, next) => {
    const shippingAddress = await ShippingAddress.find();
    if (!shippingAddress) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', shippingAddress));
}

//Update Operation
exports.updateById = async(req, res, next) => {
    const { error } = validateWithId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const shippingAddress = await ShippingAddress.findOneAndUpdate(req.params.id, {
        state: req.body.state,
        city: req.body.city,
        street: req.body.street,
        zipCode: req.body.zipCode,
        isDefault: req.body.isDefault,
    }, { new: true, useFindAndModify: true });
    console.log(shippingAddress);
    shippingAddress.save();
    res.status(200).send(new ApiResponse(200, 'success', shippingAddress));
};

//Delete Operation
exports.removeById = async(req, res, next) => {
    const { error } = validateId({ _id: req.params.id });
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const shippingAddress = await ShippingAddress.findByIdAndRemove(req.params.id);
    if (!shippingAddress) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', shippingAddress));
};