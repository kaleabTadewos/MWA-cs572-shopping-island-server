const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
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

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['email', 'role', 'status']));
}