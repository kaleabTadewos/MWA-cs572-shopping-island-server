const { Category, validate } = require('../models/category');
const ApiResponse = require('../models/api-response');
const ErrorResponse = require('../models/errorResponse');

//CRUD Operations
//Create Operation
exports.insert = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400' , error.details[0].message));
    const category = await Category.create(req.body);
    res.status(201).send(new ApiResponse(201, 'success', category));
};

//Retrive Operations
exports.findById = async (req, res, next) => {
    const { error } = validate(req.params.id);
    if (error) return res.status(400).send(new ErrorResponse('400' , error.details[0].message));
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send(new ErrorResponse('400' , 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', category));
};

exports.findAll = async (req, res, next) => {
    const categorys = await Category.find();
    if (!categorys) return res.status(404).send(new ErrorResponse('400' , 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', categorys));
}

//Update Operation
exports.updateById = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400' , error.details[0].message));
    const category = await Category.findOneAndUpdate(req.params.id,
        {
            name: req.body.name
        }, 
        { new: true, useFindAndModify: true });
    console.log(category);
    category.save();
    res.status(200).send(new ApiResponse(200, 'success', category));
};

//Delete Operation
exports.removeById = async (req, res, next) => {
    const { error } = validate(req.params.id);
    if (error) return res.status(400).send(new ErrorResponse('400' , error.details[0].message));
    const category = await Category.findByIdAndRemove(req.params.id);
    if (!category) return res.status(404).send(new ErrorResponse('400' , 'no content found!'));
    res.status(200).send(new ApiResponse(200, 'success', category));
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