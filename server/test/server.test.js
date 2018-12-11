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

    var dummyUser = {
        "name" : "User91",
        "age" : 27,
        "title": "student91",
        "address": "young91",
        "book": "book91"
    };

    console.log(typeof dummyUser);
    console.log('user1:', dummyUser);

    it('should create a new dummyUser', (done) => {

        request(app)
            .post('/dummyUsers')
            .send()
            .set('Accept', 'application/json')
            .expect(200)
            .expect(function(res) {
                console.log(' dummyUsers function(res) ');
                expect(res.body.name).toBe(dummyUser.name);
                expect(res.body.age).toBe(dummyUser.age);
                expect(res.body.title).toBe(dummyUser.title);
                expect(res.body.address).toBe(dummyUser.address);
                console.log('dummyUsers res.body passed');
            })
            .end( (err, res) => {

                if(err){
                    return done(err);
                }

                UserModel.find()
                    .then( (users) => {
                        for(var i = 0; i < users.length; i++) {
                            var obj = users[i];
                            try{
                                expect(obj).toMatchObject(dummyUser);
                                return done();
                                }catch(e){}
                            }
                            throw new Error('No dummyUser found in returned array of users');
                        }
                    )
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
    });
});

describe('GET /users', () => {

    beforeEach(function(done) {
        this.timeout(3000); // A very long environment setup.
        setTimeout(done, 2500);
      });

    it('should get all users', (done) => {

        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(function(res) {
                console.log(' users function(res) ');
                console.log('res.length:', res.body.length);
                console.log('users res.body passed');
            })
            .end(done);
    });
});

describe('GET /users/id', () => {

    const id  = '5c0fd25fbd1ed4d70afdebbf';

    beforeEach(function(done) {
        this.timeout(3000); // A very long environment setup.
        setTimeout(done, 2500);
      });

    it('should get a user', (done) => {

        request(app)
            .get('/users/' + id)
            .set('Accept', 'application/json')
            .expect(200)
            .expect(function(res) {
                console.log(' users function(res) ');
                console.log('res.length:', res.body);
                console.log('users res.body passed');
                expect(res.body._id).toBe(id);
            })
            .end(done);
    });

    it('should not get any user', (done) => {

        request(app)
            .get('/users/' + '5c0fd25fbd1ed4d70a')
            .set('Accept', 'application/json')
            .expect(400)
            .end(done);
    });
});


describe('DELETE /users/id', () => {

    var id;

    request(app)
    .get('/users')
    .set('Accept', 'application/json')
    .expect(200)
    .then((res) => {
        id = res.body[0]._id;
    });

    it('should delete a user by id', (done) => {

        request(app)
            .delete('/users/' + id)
            .set('Accept', 'application/json')
            .expect(200)
            .expect(function(res) {
                console.log(' users function(res) ');
                console.log('res:', res.body);
                console.log('users res.body passed');
                expect(res.body._id).toBe(id);
            })
            .end(done);
    });

    it('should not get any user for deletion by this id', (done) => {

        request(app)
            .get('/users/' + '5c0fd25fbd1ed4d70a')
            .set('Accept', 'application/json')
            .expect(400)
            .end(done);
    });
});

