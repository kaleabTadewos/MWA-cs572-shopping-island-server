const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    desctiption: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    sub_Category: {
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 255
        },
        category: {
            name: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 255
            }
        }

    },
    require: true

});


function validateProductWithId(product) {
    const schema = {
        _id: Joi.objectId(),
        name: Joi.string().min(2).max(255).required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        zipCode: Joi.string().required(),
        isDefault: Joi.boolean().required(),

    };

    return Joi.validate(product, schema);
}

function validateProductId(product) {
    const schema = {
        _id: Joi.objectId().required()
    };

    return Joi.validate(product, schema);
}

function validateProductWithOutId(product) {
    const schema = {
        state: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        zipCode: Joi.string().required(),
        isDefault: Joi.boolean().required(),
    };

    return Joi.validate(product, schema);
}

exports.Product = mongoose.model('ShippingAddress', productSchema);
exports.validateWithId = validateProductWithId;
exports.validateId = validateProductId;
exports.validateWithOutId = validateProductWithOutId;