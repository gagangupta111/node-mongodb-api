const moongose = require('mongoose');

const uri = "mongodb+srv://user1:Admin@123@cluster0-79m7r.mongodb.net/db1";

moongose.Promise = global.Promise;
moongose.connect(uri, { useNewUrlParser: true })
    .then( (res) => {
        console.log('Connected');
    })
    .catch( (err) => {
        console.log('error:', err);
    });

    module.exports.moongose = moongose;
    