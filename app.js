const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const categoryRoutes = require('./routes/category');
const config = require('config');
const app = express();

if (!config.get('jwtPrivateKey')) {
    console.log(config.get('jwtPrivateKey'))
    console.error('jwtPrivateKey is not defined')
    process.exit(1);
}
console.log("config.get('jwtPrivateKey')", config.get('jwtPrivateKey'))

app.use(express.json())
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