const express = require('express');
const bodyParser = require('body-parser');

const {BookModel} = require('../models/book');
const {UserModel} = require('../models/user');
const {moongose} = require('../db/mongoose');
const {ObjectID} = require('mongodb');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

app.get('/', (req, res) => {

    setTimeout(() => {
        res.send('Hello World!');
    }, 1570);
    
});

app.post('/check', (req, res) => {
    res
        .status(200)
        .send({
            key: 'key',
            value: 'value'
        });
});

app.get('/users', (req, res) => {
    
    UserModel.find()
        .then( (result) => {
            console.log('found result:');
            res.status(200).send(result);
        })
        .catch( (error) => {
            console.log('found error:', error);
            res.status(400).send(error);
        });
});

app.get('/users/:id', (req, res) => {
    
    if(!isValidID(req.params.id)){
        console.log('/users/:id not valid id');
        return res.status(400).send({
            error: 'Invalid ID'
        });
    }

    UserModel.findById(req.params.id)
        .then( (result) => {
            console.log('found result:');
            res.status(200).send(result);
        })
        .catch( (error) => {
            console.log('found error:', error);
            res.status(400).send(error);
        });
});

app.get('/findById', (req, res) => {
    
    if(!isValidID(req.body._id)){
        console.log('/users/:id not valid id');
        return res.status(400).send({
            error: 'Invalid ID'
        });
    }

    UserModel.findById(req.body._id)
        .then( (result) => {
            console.log('found result:');
            res.status(200).send(result);
        })
        .catch( (error) => {
            console.log('found error:', error);
            res.status(400).send(error);
        });
});

app.get('/findByName', (req, res) => {
    
    UserModel.find({
            name: req.body.name
        })
        .then( (result) => {
            console.log('found result:');
            res.status(200).send(result);
        })
        .catch( (error) => {
            console.log('found error:', error);
            res.status(400).send(error);
        });
});

app.get('/userById', (req, res) => {
    
    if(!isValidID(req.params._id)){
        console.log('/users/:id not valid id');
        return res.status(400).send({
            error: 'Invalid ID'
        });
    }

    UserModel.find({
            _id: req.body._id
        })
        .then( (result) => {
            console.log('found result:');
            res.status(200).send(result);
        })
        .catch( (error) => {
            console.log('found error:', error);
            res.status(400).send(error);
        });
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
        name : "User91",
        age : 27,
        title: "student91",
        address: "young91",
        book: "book91"
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

const isValidID = (id) => {
    if(!ObjectID.isValid(id)){
        console.log('Not Valid ID');
        return false;
    }
    return true;
}

module.exports.app = app;
module.exports.isValidID = isValidID;
