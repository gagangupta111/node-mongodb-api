const env = process.env.NODE_ENV || 'developement';
console.log('env ==================', env);

if(env === 'developement'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI =  "mongodb+srv://user1:Admin@123@cluster0-79m7r.mongodb.net/db1";
}else if(env === 'test'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI =  "mongodb+srv://user1:Admin@123@cluster0-79m7r.mongodb.net/test";
}

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

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

    console.log('get /users/:id called');
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

app.delete('/users/:id', (req, res) => {

    console.log('delete /users/:id called');
    if(!isValidID(req.params.id)){
        console.log('/users/:id not valid id');
        return res.status(400).send({
            error: 'Invalid ID'
        });
    }

    UserModel.findByIdAndRemove(req.params.id)
        .then( (result) => {
            console.log('found result:');
            res.status(200).send(result);
        })
        .catch( (error) => {
            console.log('found error:', error);
            res.status(400).send(error);
        });
});

app.delete('/deleteAll', (req, res) => {

    console.log('deleteAllcalled');

    UserModel.deleteMany({})
        .then( (result) => {
            console.log('found result:');
            res.status(200).send(result);
        })
        .catch( (error) => {
            console.log('found error:', error);
            res.status(400).send(error);
        });
});

app.patch('/users/:id', (req, res) => {

    console.log('patch /users/:id called');
    if(!isValidID(req.params.id)){
        console.log('/users/:id not valid id');
        return res.status(400).send({
            error: 'Invalid ID' + req.params.id
        });
    }

    var body = _.pick(req.body, ['age', 'title']);
    UserModel.findOneAndUpdate(req.params.id, {$set : body}, {new : true})
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
        console.log('Not Valid ID:', id);
        return false;
    }
    return true;
}

module.exports.app = app;
module.exports.isValidID = isValidID;
