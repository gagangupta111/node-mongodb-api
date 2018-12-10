var moongose = require('mongoose');

const uri = "mongodb+srv://user1:Admin@123@cluster0-79m7r.mongodb.net/db1";

moongose.Promise = global.Promise;

const client = moongose.connect(uri, { useNewUrlParser: true })
    .then( (res) => {
        console.log('Connected');
    })
    .catch( (err) => {
        console.log('error:', err);
    });

var UserModel = moongose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    age: {
        type: Number,
        required: true,
        minlength: 1
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        default: "title0"
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        default: "address0"
    },
    book: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
},  "users" );

var BookModel = moongose.model('Book', {
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    ISBN: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
},  "books" );

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

