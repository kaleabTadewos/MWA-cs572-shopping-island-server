const {Category, validate} = require('../models/category'); 
const ApiResponse = require('../models/api-response');

exports.insert = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.send(error.details[0].message);

    const category = await Category.create(req.body);
    if (!category) return res.send(new ApiResponse(500, 'error', err));
    res.status(201).send(new ApiResponse(201, 'success', category));
};

exports.getById = async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if(!category) return res.status(404).send(new ApiResponse(404 , 'error' , err));
    res.status(200).send(new ApiResponse(200 , 'success' , category));
};

// exports.patchById = (req, res, next) => {
//     User.findById(req.params.userId)
//         .then(user => {
//             for (let i in req.body) {
//                 user[i] = req.body[i];
//             }
//             return user.save();
//         })
//         .then(result => {
//             res.status(200).send(new ApiResponse(200, 'success', result));
//         });
// };

exports.list = async (req, res, next) => {
    try {
        const categorys = await Category.find();
        res.status(200).send(new ApiResponse(200 , 'success' , categorys));
    }
    catch (err){
        return res.status(404).send(new ApiResponse(404 , 'error' , err));
    } 
}

// exports.removeById = (req, res, next) => {
//     User.findByIdAndDelete(req.params.userId)
//         .then(result => {
//             res.status(200).send(new ApiResponse(200, 'success', result));
//         })
//         .catch(err => {
//             res.status(500).send(new ApiResponse(500, 'error', err));
//         });
// };

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