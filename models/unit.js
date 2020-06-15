const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const unitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});


function validateUnit(unit) {
    const schema = {
        name: Joi.string().required(),
        quantity: Joi.number().required(),
    };

    return Joi.validate(unit, schema);
}

exports.Unit = mongoose.model('Unit', unitSchema);
exports.validate = validateUnit;