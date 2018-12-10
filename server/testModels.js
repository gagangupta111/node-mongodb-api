const moongose = require('mongoose');

const {BookModel} = require('../models/book');
const {UserModel} = require('../models/user');

const uri = "mongodb+srv://user1:Admin@123@cluster0-79m7r.mongodb.net/db1";

moongose.Promise = global.Promise;
moongose.connect(uri, { useNewUrlParser: true })
    .then( (res) => {
        console.log('Connected');
    })
    .catch( (err) => {
        console.log('error:', err);
    });

var user1 = new UserModel({
    name : 'User1',
    age : 19,
    title: 'student',
    address: 'young',
    book: 'book9'
});

var book1 = new BookModel({
    name : 'Book1',
    title: 'title1',
    ISBN: 'ISBN-7687-87687-jhg7'
});

user1.save()
    .then( (res) => {
        console.log('Saved user1', res);
    })
    .catch( (err) => {
        console.log('Unable to Save user1', err);
    });

book1.save()
    .then( (res) => {
        console.log('Saved book', res);
    })
    .catch( (err) => {
        console.log('Unable to Save book1', err);
    });

