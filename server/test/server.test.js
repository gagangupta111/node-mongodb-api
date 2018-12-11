const expect = require('expect');
const supertest = require('supertest');

const {app} = require('./../server');
const {UserModel} = require('./../../models/user');

describe('POST /users', () => {

    var user1 = {
        "name" : "User6",
        "age" : 19,
        "title": "student6",
        "address": "young6",
        "book": "book6"
    };

    console.log(typeof user1);

    it('should create a new user', (done) => {
        supertest(app)
            .post('/users')
            .send(user1)
            .expect(200)
            .expect( (res) => {
                expect(res.body.name).toBe(user1.name);
                expect(res.body.age).toBe(user1.age);
                expect(res.body.title).toBe(user1.title);
                expect(res.body.address).toBe(user1.address);
                console.log('res.body passed');
            })
            .end(done());


            // .end( (err, res) => {

            //     if(err){
            //         console.log(err);
            //         return done(err);
            //     }

            //     UserModel.find()
            //         .then( (users) => {
            //             console.log(users);
            //             expect(users).toContain(user1);
            //             done();
            //         })
            //         .catch( (err) => {
            //             done(err);
            //         });            
            //            })
            
    });

})