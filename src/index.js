require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/user');

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true })
    .then(() => console.log('Database is connected'))
    .catch(err => console.log(`Can not connect to the database: ${err}`));

const app = express();

app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);

app.get('/', (req, res) => {
    res.send('Hi!');
});

const PORT = process.env.APP_PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});