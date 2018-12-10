const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const uri = "mongodb+srv://user1:Admin@123@cluster0-79m7r.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

const addUser = (user) => {

    client.connect(err => {
        if(err){
            return console.log('Unable to connect to mongodb database.');
        }
        
        const db = client.db('db1');
        const collection = db.collection('users');

        collection.insertOne(user, (err, result) => {
            if(err){
                console.log('Unable to insert documents');
            }

            console.log(JSON.stringify(result.ops));
        });

        client.close();
        return true;
    });
};

const findAllUsers = () => {

    client.connect(err => {
        if(err){
            return console.log('Unable to connect to mongodb database.');
        }
        
        const db = client.db('db1');
        const collection = db.collection('users');

        collection.find({}).toArray((err, docs) => {
            assert.equal(err, null);
            return docs;
        });

        client.close();
    });
};

const updateUser = (user) => {

    client.connect(err => {
        if(err){
            return console.log('Unable to connect to mongodb database.');
        }
        
        const db = client.db('db1');
        const collection = db.collection('users');

        collection.updateOne(user, (err, result) => {
            if(err){
                console.log('Unable to insert documents');
            }

            console.log(JSON.stringify(result.ops));
        });

        client.close();
        return true;
    });
};

const deleteUser = (user) => {

    client.connect(err => {
        if(err){
            return console.log('Unable to connect to mongodb database.');
        }
        
        const db = client.db('db1');
        const collection = db.collection('users');

        collection.deleteOne(user, (err, result) => {
            if(err){
                console.log('Unable to insert documents');
            }

            console.log(JSON.stringify(result.ops));
        });

        client.close();
        return true;
    });
};

client.connect(err => {
    if(err){
        return console.log('Unable to connect to mongodb database.');
    }

    const db = client.db('db1');
    const collection = db.collection('users');

    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
      });

    console.log(collection.dbName);

    collection.insertOne({
        name: "C V Raman ",
        age : 23,
        firstName: "C V",
        lastName: "Raman"
    }, (err, result) => {
        if(err){
            console.log('Unable to insert documents');
        }

        console.log(JSON.stringify(result.ops));
    });

    client.close();
});

module.exports.addUser = addUser;
module.exports.updateUser = updateUser;
module.exports.findAllUsers = findAllUsers;
module.exports.deleteUser = deleteUser;
