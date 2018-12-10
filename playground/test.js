const crudOp = require('./crudUser');

var user = {
    name : 'User1',
    age : 19,
    title: 'student',
    address: 'young'
};

// crudOp.addUser(user);

// crudOp.deleteOneWithName('User1');
// crudOp.deleteManyWithName('User1');
// crudOp.findOneAndDelete('User1');

crudOp.findOneUpdateNameIncAge('User1');

// crudOp.findAllUsersCount();
// var users = crudOp.findAllUsers();
// crudOp.findAllUsersWithName('gagan gupta');
// crudOp.findAllUsersWithObjectID('5c0d8b3887912398ea87a66f');
