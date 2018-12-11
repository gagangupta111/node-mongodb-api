const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {UserModel} = require('./../../models/user');

describe('GET /', () => {

    it('Should return hello world response!', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .expect('Hello World!')
            .end(done);
    });

});

describe('POST /check', () => {

    it('Should return post response', (done) => {
        request(app)
            .post('/check')
            .send()
            .expect(200)
            .expect( (res) =>  {
                expect(res.body).toMatchObject({
                    key: 'key',
                    value: 'value'
                });
            })
            .end(done);
    });

});



describe('POST /dummyUsers', () => {
   
    beforeEach(function(done) {
        this.timeout(3000); // A very long environment setup.
        setTimeout(done, 2500);
      });

    var user1 = {
        "name" : "User6",
        "age" : 19,
        "title": "student6",
        "address": "young6",
        "book": "book6"
    };

    console.log(typeof user1);
    console.log('user1:', user1);

    it('should create a new dummyUser', (done) => {

        request(app)
            .post('/dummyUsers')
            .send()
            .set('Accept', 'application/json')
            .expect(200)
            .expect(function(res) {
                console.log(' dummyUsers function(res) ');
                expect(res.body.name).toBe(user1.name);
                expect(res.body.age).toBe(user1.age);
                expect(res.body.title).toBe(user1.title);
                expect(res.body.address).toBe(user1.address);
                console.log('dummyUsers res.body passed');
            })
            .end( (err, res) => {

                if(err){
                    return done(err);
                }

                UserModel.find()
                    .then( (users) => {
                        console.log('users:', users);
                        done();
                    })
                    .catch( (err) => {
                        return done(err);
                    });
            });

        });

});


describe('POST /users', () => {
    
    beforeEach(function(done) {
        this.timeout(3000); // A very long environment setup.
        setTimeout(done, 2500);
      });
      
    var user1 = {
        "name" : "User6",
        "age" : 19,
        "title": "student6",
        "address": "young6",
        "book": "book6"
    };

    console.log(typeof user1);

    it('should create a new user', (done) => {
        
        request(app)
            .post('/users')
            .send(user1)
            .set('Accept', 'application/json')
            .expect(200)
            .expect(function(res) {
                console.log(' users function(res) ');
                expect(res.body.name).toBe(user1.name);
                expect(res.body.age).toBe(user1.age);
                expect(res.body.title).toBe(user1.title);
                expect(res.body.address).toBe(user1.address);
                console.log('users res.body passed');
            })
            .end(done);

            // .end( (err, res) => {

            //     console.log('err:', err);
            //     console.log('res:', res);

            //     if(err){
            //         console.log(err);
            //         return done(err);
            //     }

            //     UserModel.find()
            //         .then( (users) => {
            //             console.log(users);
            //             done();
            //         })
            //         .catch( (err) => {
            //             return done(err);
            //         });
            // });


    });

});
