const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name : {
        type: String , 
        required : true,
        minlength: 2, 
        maxlength: 255
    }
});

const Category =  mongoose.model('Category' , categorySchema); 

function validateCategory(category) {
    const schema = {
        name: Joi.string().min(2).max(255).required()
    };

    return Joi.validate(category, schema);
}

exports.Category = Category;
exports.validate = validateCategory;