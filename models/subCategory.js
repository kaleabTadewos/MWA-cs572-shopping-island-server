const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name : {
        type: String , 
        required : true,
        minlength: 2, 
        maxlength: 255
    } , 
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

const SubCategory =  mongoose.model('SubCategory' , subCategorySchema); 

function validateSubCategoryWithId(subCategory) {
    const schema = {
        _id: Joi.objectId().required() ,
        name: Joi.string().min(2).max(255).required() , 
        categoryId: Joi.objectId().required()
    };

    return Joi.validate(subCategory, schema);
}

function validateSubCategoryId(subCategory) {
    const schema = {
        _id: Joi.objectId().required()
    };

    return Joi.validate(subCategory, schema);
}

function validateSubCategoryWithOutId(subCategory) {
    const schema = {
        name: Joi.string().min(2).max(255).required() , 
        categoryId: Joi.objectId().required()
    };

    return Joi.validate(subCategory, schema);
}

exports.SubCategory = SubCategory;
exports.validateWithId = validateSubCategoryWithId;
exports.validateId = validateSubCategoryId;
exports.validateWithOutId = validateSubCategoryWithOutId;