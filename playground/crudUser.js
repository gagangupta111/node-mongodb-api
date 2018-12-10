const {MongoClient, ObjectID} = require('mongodb');
const assert = require('assert');

const uri = "mongodb+srv://user1:Admin@123@cluster0-79m7r.mongodb.net";
const client = new MongoClient(uri, { useNewUrlParser: true });

const addUser = (user) => {

    client.connect(err => {
        if(err){
            return console.log('Unable to connect to mongodb database.');
        }        
        const db = client.db('db1');
        const collection = db.collection('users');

        collection.insertOne(user)
        .then((res) => {
            console.log(res.ops);
        })
        .catch( (err) => {
                console.log('Unable to insert documents', err);
        });

        client.close();
        return true;
    });
};

const findAllUsers = () => {
    var users = 
     client.connect(err => {
        if(err){
            return console.log('Unable to connect to mongodb database.');
        }
        
        const db = client.db('db1');
        const collection = db.collection('users');

        collection.find().toArray()
        .then((docs) => {
            console.log('got docs', docs);
            return docs;
        })
        .catch((err) => {
            console.log('Unable to fetch docs', err);
            return undefined;
        });

        client.close();
    });
    return users;
};

const findAllUsersCount = () => {
    var users = 
     client.connect(err => {
        if(err){
            return console.log('Unable to connect to mongodb database.');
        }
        
        const db = client.db('db1');
        const collection = db.collection('users');

        collection.find().count()
        .then((docs) => {
            console.log('got docs', docs);
            return docs;
        })
        .catch((err) => {
            console.log('Unable to fetch docs', err);
            return undefined;
        });

        client.close();
    });
    return users;
};

const findAllUsersWithName = (username) => {
    var users = 
     client.connect(err => {
        if(err){
            return console.log('Unable to connect to mongodb database.');
        }
        
        const db = client.db('db1');
        const collection = db.collection('users');

        collection.find({
            name: username
        }).toArray()
        .then((docs) => {
            console.log('got docs', docs);
            return docs;
        })
        .catch((err) => {
            console.log('Unable to fetch docs', err);
            return undefined;
        });

        client.close();
    });
    return users;
};

const findAllUsersWithObjectID = (id) => {
    var users = 
     client.connect(err => {
        if(err){
            return console.log('Unable to connect to mongodb database.');
        }
        
        const db = client.db('db1');
        const collection = db.collection('users');

        collection.find({
            _id: new ObjectID(id)
        }).toArray()
        .then((docs) => {
            console.log('got docs', docs);
            return docs;
        })
        .catch((err) => {
            console.log('Unable to fetch docs', err);
            return undefined;
        });

        client.close();
    });
    return users;
};


const deleteOneWithName = (userName) => {
    var users = 
     client.connect(err => {
        if(err){
            return console.log('Unable to connect to mongodb database.');
        }
        
        const db = client.db('db1');
        const collection = db.collection('users');

        collection.deleteOne({
            name: userName
        })
        .then((docs) => {
            console.log('deleted docs', docs);
            return docs;
        })
        .catch((err) => {
            console.log('Unable to delete docs', err);
            return undefined;
        });

        client.close();
    });
    return users;
};

const findOneAndDelete = (userName) => {
    var users = 
     client.connect(err => {
        if(err){
            return console.log('Unable to connect to mongodb database.');
        }
        
        const db = client.db('db1');
        const collection = db.collection('users');

        collection.findOneAndDelete({
            name: userName
        })
        .then((docs) => {
            console.log('deleted docs', docs);
            return docs;
        })
        .catch((err) => {
            console.log('Unable to delete docs', err);
            return undefined;
        });

        client.close();
    });
    return users;
};

const deleteManyWithName = (userName) => {
    var users = 
     client.connect(err => {
        if(err){
            return console.log('Unable to connect to mongodb database.');
        }
        
        const db = client.db('db1');
        const collection = db.collection('users');

        collection.deleteMany({
            name: userName
        })
        .then((docs) => {
            console.log('deleted docs', docs);
            return docs;
        })
        .catch((err) => {
            console.log('Unable to delete docs', err);
            return undefined;
        });

        client.close();
    });
    return users;
};

const findOneUpdateNameIncAge = (userName) => {
    var users = 
     client.connect(err => {
        if(err){
            return console.log('Unable to connect to mongodb database.');
        }
        
        const db = client.db('db1');
        const collection = db.collection('users');

        collection.findOneAndUpdate({
            name: userName
        }, {
            $set: {
                name : 'gagan gupta'
            },
            $inc: {
                age: 1
            }
        },
        {
            returnOriginal: false
        })
        .then((docs) => {
            console.log('Updated docs', docs);
            return docs;
        })
        .catch((err) => {
            console.log('Unable to update docs', err);
            return undefined;
        });

        client.close();
    });
    return users;
};

module.exports.addUser = addUser;

module.exports.deleteOneWithName = deleteOneWithName;
module.exports.deleteManyWithName = deleteManyWithName;
module.exports.findOneAndDelete = findOneAndDelete;

module.exports.findOneUpdateNameIncAge = findOneUpdateNameIncAge;

module.exports.findAllUsers = findAllUsers;
module.exports.findAllUsersWithName = findAllUsersWithName;
module.exports.findAllUsersWithObjectID = findAllUsersWithObjectID;
module.exports.findAllUsersCount = findAllUsersCount;
