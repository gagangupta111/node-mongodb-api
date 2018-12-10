const crudOp = require('./crudUser');

var user = {
    name : 'User1',
    age : 19,
    title: 'student',
    address: 'young'
};

crudOp.addUser(user);

var users = crudOp.findAllUsers();
console.log('All users', users);

crudOp.deleteUser(user);
users = crudOp.findAllUsers();
console.log('After delete all users', users);

crudOp.updateUser({
        name : 'User1'
    }, {
        book: 'book1'
    });
users = crudOp.findAllUsers();
console.log('After delete all users', users);
