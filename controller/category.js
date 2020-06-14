const { Category, validate } = require('../models/category');
const ApiResponse = require('../models/api-response');

//CRUD Operations
//Create Operation
exports.insert = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const category = await Category.create(req.body);
    res.status(201).send(new ApiResponse(201, 'success', category));
};

//Retrive Operations
exports.findById = async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send('category with the given ID was not found.');
    res.status(200).send(new ApiResponse(200, 'success', category));
};

exports.findAll = async (req, res, next) => {
    const categorys = await Category.find();
    if (!categorys) return res.status(404).send('categorys not found.');
    res.status(200).send(new ApiResponse(200, 'success', categorys));
}

//Update Operation
exports.updateById = async (req, res, next) => {
    const { error } = validate(req.body);
    console.log(error);
    if (error) return res.status(400).send(error.details[0].message);
    const category = await Category.findOneAndUpdate(req.params.id,
        {
            name: req.body.name
        }, { new: true, useFindAndModify: true });
    console.log(category);
    category.save();
    res.status(200).send(new ApiResponse(200, 'success', category));
};

//Delete Operation
exports.removeById = async (req, res, next) => {
    const category = await Category.findByIdAndRemove(req.params.id);
    if (!category) return res.status(404).send('The customer with the given ID was not found.');
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