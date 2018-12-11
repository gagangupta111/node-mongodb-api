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

    console.log('user:' , user);

    user.save()
        .then( (result) => {
            console.log('saved result:', result);
            res.status(200).send(result);
        })
        .catch( (error) => {
            console.log('found error:', error);
            res.status(400).send(error);
        });
});

app.post('/dummyUsers', (req, res) => {
    
    var user = new UserModel({
        name: 'name',
        age: 20,
        title: 'title1',
        address: 'address',
        book: 'book1'
    });

    console.log('user:' , user);

    user.save()
        .then( (result) => {
            console.log('saved result:', result);
            res.status(200).send(result);
        })
        .catch( (error) => {
            console.log('found error:', error);
            res.status(400).send(error);
        });
});

module.exports.app = app;
