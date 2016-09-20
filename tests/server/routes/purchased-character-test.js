var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var supertest = require('supertest');


describe('Purchased Character Route', function() {
    var app, purchasedCharacter, agent;

    beforeEach('Sync DB', function () {
        return db.sync({ force: true });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        purchasedCharacter = db.model('purchasedCharacter');
        agent = supertest.agent(app);
    });

    //use model to put stuff in DB with before each
    beforeEach('add junk data', function() {
        var testData = {name: "testy", price: "500"};
        return purchasedCharacter.create(testData);
    })

    it('should return test junk data', function() {
        agent.get('/api/purchased-characters').expect(200).end(function (err, response) {
            if (err) return done(err);
            console.log("RES BODY: ", response.body);
            expect(response.body).to.be.an('array');
            expect(response.body[0].name).to.equal("testy")
            done();
        });
    })

    // it('should test data in correct', function() {
    //     agent.get('/api/purchased-characters').expect(200).end(function (err, response) {
    //         if (err) return done(err);
    //         console.log("RES BODY: ", response.body);
    //         expect(response.body).to.be.an('array');
    //         expect(response.body[0].name).to.equal("testy")
    //         done();
    //     });
    // })
    // it('should create a purchased character when post is hit', function(done) {
    //     agent.post('/api/purchased-characters').send([])
    //
    // })


});
