const crudOp = require('./crudUser');

var user = {
    name : 'Dr. manhattan',
    age : 29,
    title: 'doctor',
    address: 'Awakened World'
};

crudOp.addUser(user);

var users = crudOp.findAllUsers();
console.log('All users', users);

crudOp.deleteUser(user);
users = crudOp.findAllUsers();
console.log('After delete all users', users);

crudOp.updateUser({
        name : 'Dr. manhattan'
    }, 
    {
        book: 'New World Order'
    });
users = crudOp.findAllUsers();
console.log('After delete all users', users);


