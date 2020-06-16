const Joi = require('joi');

function validateUserWithId(user) {
    const schema = {
        _id: Joi.objectId().required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
        status: Joi.string(),
        role: Joi.string(),
        state: Joi.string().min(5).max(255).required(),
        city: Joi.string().min(5).max(255).required(),
        street: Joi.string().min(5).max(255).required(),
        zipCode: Joi.string().min(5).max(5).required(),
        firstName: Joi.string().min(5).max(255).required(),
        lastName: Joi.string().min(5).max(255).required(),
        phoneNumber: Joi.string().min(10).max(10).required(),
        accountNumber: Joi.number().required(),
        expiryDate: Joi.date().required(),
        nameOntheCard: Joi.string().min(5).max(255).required(),
        ccv: Joi.number().required()
    };

    return Joi.validate(user, schema);
}

function validateUserId(user) {
    const schema = {
        _id: Joi.objectId().required()
    };

    return Joi.validate(user, schema);
}

function validateUserWithOutId(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
        status: Joi.string(),
        role: Joi.string(),
        state: Joi.string().min(2).max(255).required(),
        city: Joi.string().min(5).max(255).required(),
        street: Joi.string().min(5).max(255).required(),
        zipCode: Joi.string().min(5).max(5).required(),
        firstName: Joi.string().min(5).max(255).required(),
        lastName: Joi.string().min(5).max(255).required(),
        phoneNumber: Joi.string().min(10).max(10).required(),
        accountNumber: Joi.number().required(),
        expiryDate: Joi.date().required(),
        nameOntheCard: Joi.string().min(5).max(255).required(),
        ccv: Joi.number().required()
    };

    return Joi.validate(user, schema);
}

exports.validateWithId = validateUserWithId;
exports.validateId = validateUserId;
exports.validateWithOutId = validateUserWithOutId;