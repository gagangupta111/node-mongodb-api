const {moongose} = require('../db/mongoose');

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

module.exports.UserModel = UserModel;
