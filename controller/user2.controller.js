const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const mongoose = require('mongoose');
const { User2 } = require('../models/user2');
const { OrderDetail } = require('../models/orderDetail');
const { Item } = require('../models/item');
const ApiResponse = require('../models/apiResponse');
const ErrorResponse = require('../models/errorResponse');
const { validateId, validateWithOutId, validateWithId } = require('../models/request/user2.request');


exports.insert = async(req, res, next) => {
    const { error } = validateWithOutId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    let userExist = await User2.findOne({ email: req.body.email });
    if (userExist) return res.status(400).send('user2 already exist');

    const user2 = await User2.create({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        status: req.body.status,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        'billingInformation.state': req.body.state,
        'billingInformation.city': req.body.city,
        'billingInformation.street': req.body.street,
        'billingInformation.zipCode': req.body.zipCode,
        'billingInformation.phoneNumber': req.body.phoneNumber,
        'billingInformation.accountNumber': req.body.accountNumber
    });
    res.status(201).send(new ApiResponse(201, 'success', user2));
};

//Retrive Operations
exports.findById = async(req, res, next) => {
    const { error } = validateId({ _id: req.params.id });
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const user2 = await User2.findById(req.params.id);
    if (!user2) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', user2));
};

exports.findAll = async(req, res, next) => {
    const user2s = await User2.find();
    if (!user2s) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', user2s));
}

//Update Operation
exports.updateById = async(req, res, next) => {
    const { error } = validateWithId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const subCategory = await SubCategory.findById(req.body.subCategoryId);
    if (!subCategory) res.status(400).send(new ErrorResponse('400', 'Invalid Sub Category Id!'));
    const product = await Product.findOneAndUpdate(req.params.id, {
        name: req.body.name,
        userId: userId,
        description: description,
        imageUrl: imageUrl,
        subCategory: subCategory
    }, { new: true, useFindAndModify: true });
    Product.save();
    res.status(200).send(new ApiResponse(200, 'success', product));
};

//Delete Operation
exports.removeById = async(req, res, next) => {
    const { error } = validateId({ _id: req.params.id });
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', product));
};
/* get a user2. */
// exports.getUser = async function(request, response) {
//         const user2 = await User2.findById(request.user2._id).select('-password');
//         response.send(user2);
//     }
//     /* register users. */
// exports.registerUser = async function(request, response) {
//     const { error } = validate(request.body);
//     if (error) return response.status(400).send(error.details[0].message);


//     let user2 = await User2.findOne({ email: request.body.email });
//     if (user2) return response.status(400).send('user2 already exist')

//     user2 = new User2({
//         email: request.body.email,
//         password: request.body.password,
//         status: request.body.status,
//         role: request.body.role
//     })

//     const salt = await bcrypt.genSalt(10);
//     user2.password = await bcrypt.hash(user2.password, salt);

//     await user2.save();

//     const token = user2.generateAuthToken();
//     response.header('x-auth-token', token).send(_.pick(user2, ['email', 'role', 'status']));
// }