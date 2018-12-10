const crudOp = require('./crudUser');

var user = {
    _id: '123',
    name : 'User1',
    age : 19,
    title: 'student',
    address: 'young'
};


var users = crudOp.findAllUsers();

// crudOp.findAllUsersWithName('gagan gupta');
// crudOp.findAllUsersWithObjectID('5c0d8b3887912398ea87a66f');

