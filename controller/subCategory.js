const { SubCategory, validate } = require('../models/subCategory');
const { Category, validateId , validateWithOutId , validateWithId } = require('../models/subCategory');
const ApiResponse = require('../models/apiResponse');
const ErrorResponse = require('../models/errorResponse');

//CRUD Operations
//Create Operation
exports.insert = async (req, res, next) => {
    const { error } = validateWithOutId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400' , error.details[0].message));
    const subCategory = await SubCategory.create(req.body);
    res.status(201).send(new ApiResponse(201, 'success', subCategory));
};

//Retrive Operations
exports.findById = async (req, res, next) => {
    const { error } = validateId(new ObjectId(req.params.id));
    if (error) return res.status(400).send(new ErrorResponse('400' , error.details[0].message));
    const subCategory = await SubCategory.findById(req.params.id)
        .populate('categoryId')
        .execPopulate();
    if (!subCategory) return res.status(404).send(new ErrorResponse('400' , 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', subCategory));
};

exports.findAll = async (req, res, next) => {
    const subCategories = await SubCategory.find()
    .populate('categoryId')
    execPopulate();
    if (!subCategories) return res.status(404).send(new ErrorResponse('400' , 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', subCategories));
}

//Update Operation
exports.updateById = async (req, res, next) => {
    const { error } = validateWithId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400' , error.details[0].message));
    const subCategory = await SubCategory.findOneAndUpdate(req.params.id,
        {
            name: req.body.name , 
            categoryId: req.body.categoryId
        }, 
        { new: true, useFindAndModify: true });
    console.log(subCategory);
    subCategory.save();
    res.status(200).send(new ApiResponse(200, 'success', subCategory));
};

//Delete Operation
exports.removeById = async (req, res, next) => {
    const { error } = validateId(new ObjectId(req.params.id));
    if (error) return res.status(400).send(new ErrorResponse('400' , error.details[0].message));
    const subCategory = await SubCategory.findByIdAndRemove(req.params.id);
    if (!subCategory) return res.status(404).send(new ErrorResponse('400' , 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', subCategory));
};

// exports.getNoOfUsersInRole = (req, res, next) => {
//     User.aggregate([
//         { $group: { _id: "$role", sum_users: { $sum: 1 } } }
//     ])
//         .then(result => {
//             res.status(200).send(new ApiResponse(200, 'success', result));
//         })
//         .catch(err => {
//             res.status(500).send(new ApiResponse(500, 'error', err));
//         });
// };