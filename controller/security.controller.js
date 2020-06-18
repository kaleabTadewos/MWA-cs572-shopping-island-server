const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const mongoose = require('mongoose');
const { User } = require('../models/user');
const { Address } = require('../models/address');
const { OrderDetail } = require('../models/orderDetail');
const { Item } = require('../models/item');
const ApiResponse = require('../models/apiResponse');
const ErrorResponse = require('../models/errorResponse');
const { validateId, validateWithOutId, validateWithId, validateShoppingCart, validateOrderPlacement } = require('../models/request/user.request');

exports.insert = async(req, res, next) => {
    const { error } = validateWithOutId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    let userExist = await User.findOne({ email: req.body.email });
    if (userExist) return res.status(400).send('user already exist');

    const newAddress = await Address.findById(req.body.addressId);

    if (!newAddress) return res.status(400).send('invalid address id!');
    let address = [newAddress];
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        status: req.body.status,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        addresses: address,
        'billingInformation.state': req.body.state,
        'billingInformation.city': req.body.city,
        'billingInformation.street': req.body.street,
        'billingInformation.zipCode': req.body.zipCode,
        'billingInformation.phoneNumber': req.body.phoneNumber,
        'billingInformation.accountNumber': req.body.accountNumber,
        'billingInformation.expiryDate': req.body.expiryDate,
        'billingInformation.nameOntheCard': req.body.nameOntheCard,
        'billingInformation.ccv': req.body.ccv
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).status(201).send(_.pick(user, ['email', 'role', 'status']));
    //res.status(201).send(new ApiResponse(201, 'success', user));
};

exports.getUserById = async function(request, response) {
    const user = await User.findById(request.user._id).select('-password');
    response.send(new ApiResponse(201, 'success', user));
}