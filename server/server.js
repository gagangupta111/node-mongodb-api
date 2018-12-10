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
        minlength: 1,
        default: "User0"
    },
    age: {
        type: Number,
        required: true,
        minlength: 1,
        default: 0
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
        minlength: 1,
        default: "book0"
    }
},  "users" );

var user1 = new UserModel({
    name : 'User1',
    age : 19,
    title: 'student',
    address: 'young'
});

user1.save()
    .then( (res) => {
        console.log('Saved user1', res);
    })
    .catch( (err) => {
        console.log('Unable to Save user1', err);
    })

