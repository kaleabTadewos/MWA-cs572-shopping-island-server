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
    description: {
        type: String,
        required: true ,
        minlength: 10,
        maxlength: 500
    },
    imageUrl: {
        type: String
    },
    subCategory: {
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
    }

});

exports.Product = mongoose.model('Product', productSchema);