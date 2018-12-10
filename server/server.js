const express = require('express');
const bodyParser = require('body-parser');

const {BookModel} = require('../models/book');
const {UserModel} = require('../models/user');
const {moongose} = require('../db/mongoose');

const app = express();

app.use(bodyParser.json())

app.listen(3000, () => {
    console.log('Started on port 3000');
});

app.post('/users', (req, res) => {
    
    console.log('req:', req.body);

    var user = new UserModel({
        name: req.body.name,
        age: req.body.age,
        title: req.body.title,
        address: req.body.address,
        book: req.body.book
    });

    user.save()
        .then( (result) => {
            res.status(201).send(result);
        })
        .catch( (error) => {
            res.status(400).send(error);
        });
});

