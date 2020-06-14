var express = require('express');
const mongoose = require('mongoose');
const { User, validate } = require('../models/User');

/* GET users listing. */
exports.registerUser = async function(req, res, next) {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('user already exist')

    user = new User({
        email: req.body.email,
        password: req.body.password,
        status: req.body.status,
        role: req.body.role
    })

    await user.save();

    res.send(user);
}