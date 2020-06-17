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
const { validateId, validateWithOutId, validateWithId, validateShoppingCart, validateOrderPlacement , validateSingleOrderPlacement , validateRemoveShoppingCart} = require('../models/request/user.request');


exports.insert = async (req, res, next) => {
    const { error } = validateWithOutId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    let userExist = await User.findOne({ email: req.body.email });
    if (userExist) return res.status(400).send('user already exist');

    const newAddress = await Address.findById(req.body.addressId);
    console.log(newAddress);
    if (!newAddress) return res.status(400).send('invalid address id!');
    let address = [newAddress];
    const userStatus = (req.body.role == "SELLER") ? "PENDING" : "ACTIVE";
    const user = await User.create({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        status: userStatus,
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
    res.status(201).send(new ApiResponse(201, 'success', user));
};

//Retrive Operations
exports.findById = async (req, res, next) => {
    const { error } = validateId({ _id: req.params.id });
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', user));
};

exports.findAll = async (req, res, next) => {
    const user = await User.find();
    if (!user) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', user));
}

//Update Operation
exports.updateById = async (req, res, next) => {
    const { error } = validateWithId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    //const subCategory = await SubCategory.findById(req.body.subCategoryId);
    //if (!subCategory) res.status(400).send(new ErrorResponse('400', 'Invalid Sub Category Id!'));
    const user = await User.findOneAndUpdate(req.params.id, {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        'billingInformation.state': req.body.state,
        'billingInformation.city': req.body.city,
        'billingInformation.street': req.body.street,
        'billingInformation.zipCode': req.body.zipCode,
        'billingInformation.phoneNumber': req.body.phoneNumber,
        'billingInformation.accountNumber': req.body.accountNumber,
        'billingInformation.expiryDate': req.body.expiryDate,
        'billingInformation.nameOntheCard': req.body.nameOntheCard,
        'billingInformation.ccv': req.body.ccv
    }, { new: true, useFindAndModify: true });
    user.save();
    res.status(200).send(new ApiResponse(200, 'success', user));
};

//Delete Operation
exports.removeById = async (req, res, next) => {
    const { error } = validateId({ _id: req.params.id });
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send(new ErrorResponse('400', 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', user));
};

exports.addToCart = async (req, res, next) => {
    const { error } = validateShoppingCart(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const item = await Item.findById(req.body.itemId);
    console.log()
    const newShoppingCart = {item: item};
    if (!item) res.status(400).send(new ErrorResponse('400', 'no content found!'));
    const user = await User.findByIdAndUpdate(req.body.userId, {
        $push: { shoppingCart: newShoppingCart }
    }, { new: true, useFindAndModify: true });
    res.status(200).send(new ApiResponse(200, 'success', user.shoppingCart));
};

exports.removeFromCart = async (req, res, next) => {
    const { error } = validateRemoveShoppingCart(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    const user = await User.findByIdAndUpdate(req.body.userId, {
        $pull: { shoppingCart:  {_id: req.body.shoppingCartId}}
    }, { new: true, useFindAndModify: true });
    res.status(200).send(new ApiResponse(200, 'success', user.shoppingCart));
};

exports.placeOrder = async (req, res, next) => {
    const { error } = validateOrderPlacement(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));

    let fncc = async function (reqItems) {
        let items = [];
        for (let h = 0; h < reqItems.length; h++) {
            const item = await Item.findById(reqItems[h]);
            console.log('e');
            if (!item) res.status(400).send(new ErrorResponse('400', 'no content found!'));
            items.push(item);
        }
        return items;
    };

    const items = await fncc(req.body.itemIds);

    // await req.body.itemIds.forEach(async(itemId) => {
    //     const item = await Item.findById(itemId);
    //     console.log("One inside");
    //     if (!item) res.status(400).send(new ErrorResponse('400', 'no content found!'));
    //     console.log("One inside");
    //     items.push(item);
    //     console.log("One inside");
    //     console.log(items);
    // });

    const newAddress = await Address.findById(req.body.addressId);
   // let newOrderDetail = items; 
    let newOrder = {orderDetail : items , shippingAddress : newAddress , orderDate : Date.now()};

    // //console.log(items);
    const user = await User.findByIdAndUpdate(req.body.userId, {
        // 'order.orderDetail': items,
        // 'order.orderDate': Date.now(),
        $addToSet: { addresses: newAddress },
        $push: {order: newOrder},
        //order: newOrder 
        // ,
        // 'order.shippingAddress.state': newAddress.state,
        // 'order.shippingAddress.city': newAddress.city,
        // 'order.shippingAddress.zipCode': newAddress.zipCode,
        // 'order.shippingAddress.street': newAddress.street,
        // 'order.shippingAddress._id': newAddress._id,
        // 'order.shippingAddress.addressString': newAddress.addressString

    }, { new: true, useFindAndModify: true });
    res.status(200).send(new ApiResponse(200, 'success', items));

}

exports.placeSingleOrder = async (req, res, next) => {
    const { error } = validateSingleOrderPlacement(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));

    const item = [];
    item[0] = await Item.findById(req.body.itemId);
    if (!item) res.status(400).send(new ErrorResponse('400', 'no content found!'));

    const newAddress = await Address.findById(req.body.addressId);
    let newOrder = {orderDetail : item , shippingAddress : newAddress , orderDate : Date.now()};

   const user = await User.findByIdAndUpdate(req.body.userId, {
        $addToSet: { addresses: newAddress },
        $push: {order: newOrder}

    }, { new: true, useFindAndModify: true });
    res.status(200).send(new ApiResponse(200, 'success', item));

}
/* get a user. */
// exports.getUser = async function(request, response) {
//         const user = await User.findById(request.user._id).select('-password');
//         response.send(user);
//     }
//     /* register users. */
// exports.registerUser = async function(request, response) {
//     const { error } = validate(request.body);
//     if (error) return response.status(400).send(error.details[0].message);


//     let user = await User.findOne({ email: request.body.email });
//     if (user) return response.status(400).send('user already exist')

//     user = new User({
//         email: request.body.email,
//         password: request.body.password,
//         status: request.body.status,
//         role: request.body.role
//     })

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(user.password, salt);

//     await user.save();

//     const token = user.generateAuthToken();
//     response.header('x-auth-token', token).send(_.pick(user, ['email', 'role', 'status']));
// }