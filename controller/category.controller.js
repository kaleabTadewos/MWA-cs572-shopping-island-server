const User = require('../models/users.model');
const ApiResponse = require('../models/api.response');

exports.insert = (req, res, next) => {
    User.create(req.body)
        .then(result => {
            res.status(201).send(new ApiResponse(201, 'success', result));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
};

exports.getById = (req, res, next) => {
    User.findById(req.params.userId)
        .then(result => {
            res.status(200).send(new ApiResponse(200, 'success', result));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
};

exports.patchById = (req, res, next) => {
    User.findById(req.params.userId)
        .then(user => {
            for (let i in req.body) {
                user[i] = req.body[i];
            }
            return user.save();
        })
        .then(result => {
            res.status(200).send(new ApiResponse(200, 'success', result));
        });
};

exports.list = (req, res, next) => {
    User.find()
        .then(users => {
            res.status(200).send(new ApiResponse(200, 'success', users));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
}

exports.removeById = (req, res, next) => {
    User.findByIdAndDelete(req.params.userId)
        .then(result => {
            res.status(200).send(new ApiResponse(200, 'success', result));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
};

exports.getNoOfUsersInRole = (req, res, next) => {
    User.aggregate([
            { $group: { _id: "$role", sum_users: { $sum: 1 } } }
        ])
        .then(result => {
            res.status(200).send(new ApiResponse(200, 'success', result));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
};


//test change 2