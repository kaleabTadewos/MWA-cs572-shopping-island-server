const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const shippingAddressSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    isDefault: {
        type: Boolean,
        required: true
    }
});


function validateUnitWithId(shippingAddress) {
    const schema = {
        _id: Joi.objectId(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        zipCode: Joi.string().required(),
        isDefault: Joi.boolean().required(),

    };

    return Joi.validate(shippingAddress, schema);
}

function validateUnitId(shippingAddress) {
    const schema = {
        _id: Joi.objectId().required()
    };

    return Joi.validate(shippingAddress, schema);
}

function validateUnitWithOutId(shippingAddress) {
    const schema = {
        state: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        zipCode: Joi.string().required(),
        isDefault: Joi.boolean().required(),
    };

    return Joi.validate(shippingAddress, schema);
}

exports.ShippingAddress = mongoose.model('ShippingAddress', shippingAddressSchema);
exports.validateWithId = validateUnitWithId;
exports.validateId = validateUnitId;
exports.validateWithOutId = validateUnitWithOutId;