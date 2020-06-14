const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const mongoose = require('mongoose');
const { User, validate } = require('../models/User');

/* get a user. */
exports.getUser = async function(request, response) {
        const user = await User.findById(request.user._id).select('-password');
        response.send(user);
    }
    /* register users. */
exports.registerUser = async function(request, response) {
    const { error } = validate(request.body);
    if (error) return response.status(400).send(error.details[0].message);


    let user = await User.findOne({ email: request.body.email });
    if (user) return response.status(400).send('user already exist')

    user = new User({
        email: request.body.email,
        password: request.body.password,
        status: request.body.status,
        role: request.body.role
    })

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    response.header('x-auth-token', token).send(_.pick(user, ['email', 'role', 'status']));
}