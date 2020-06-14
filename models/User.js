const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    status: {
        type: String,
        enum: ['Active', 'Pending', 'Inactive'],
        default: 'Pending'
    },
    role: {
        type: String,
        enum: ['Admin', 'Seller', 'Buyer']
    }

});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    };

    return Joi.validate(user, schema);
}
//exported

exports.User = User;
exports.validate = validateUser;