const {moongose} = require('../db/mongoose');

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

module.exports.BookModel = BookModel;
