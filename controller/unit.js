const { Unit, validate } = require('../models/unit');
const ApiResponse = require('../models/apiResponse');
const ErrorResponse = require('../models/errorResponse');

//CRUD Operations
//Create Operation
exports.insert = async(req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const unit = await Unit.create(req.body);
    res.status(201).send(new ApiResponse(201, 'success', unit));
};

//Retrive Operations
exports.findById = async(req, res, next) => {
    const { error } = validate(req.params.id);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const unit = await Unit.findById(req.params.id);
    if (!unit) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', unit));
};

exports.findAll = async(req, res, next) => {
    const unit = await Unit.find();
    if (!unit) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', unit));
}

//Update Operation
exports.updateById = async(req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const unit = await Unit.findOneAndUpdate(req.params.id, {
        name: req.body.name,
        quantity: req.body.quantity
    }, { new: true, useFindAndModify: true });
    console.log(unit);
    unit.save();
    res.status(200).send(new ApiResponse(200, 'success', unit));
};

//Delete Operation
exports.removeById = async(req, res, next) => {
    const { error } = validate(req.params.id);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const unit = await Unit.findByIdAndRemove(req.params.id);
    if (!unit) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', unit));
};