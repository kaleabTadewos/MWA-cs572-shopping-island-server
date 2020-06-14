const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const categoryRoutes = require('./routes/category');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(userRoutes);
app.use(loginRoutes);
app.use(categoryRoutes);

mongoose.connect('mongodb://localhost:27017/Island-shopping', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        app.listen(3000, () => {
            console.log("server is running on 3000 ...");
        })
    }).catch((err) => console.log(err));