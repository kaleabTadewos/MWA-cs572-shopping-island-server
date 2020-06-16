const Joi = require('joi');

function validateUserWithId(user) {
    const schema = {
        _id: Joi.objectId().required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
        status: Joi.string(),
        role: Joi.string(),

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
        role: Joi.string()
    };

    return Joi.validate(user, schema);
}

exports.validateWithId = validateUserWithId;
exports.validateId = validateUserId;
exports.validateWithOutId = validateUserWithOutId;