const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const orderInformationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const OrderInfrormation = mongoose.model('OrderInfrormation', orderInformationSchema);

function validateOrderInformationWithId(orderInformation) {
    const schema = {
        _id: Joi.objectId().required(),
        userId: Joi.objectId().required(),
        balance: Joi.number().required()
    };

    return Joi.validate(orderInformation, schema);
}

function validateBankId(orderInformation) {
    const schema = {
        _id: Joi.objectId().required()
    };

    return Joi.validate(orderInformation, schema);
}

function validateBankWithOutId(orderInformation) {
    const schema = {
        userId: Joi.objectId().required(),
        balance: Joi.number().required()
    };

    return Joi.validate(orderInformation, schema);
}

exports.OrderInfrormation = OrderInfrormation;
exports.validateWithId = validateOrderInformationWithId;
exports.validateId = validateOrderInformationId;
exports.validateWithOutId = validateOrderInformationWithOutId;