var expect = require('chai').expect;

var Sequelize = require('sequelize')

var db = require('../../../server/db');

var supertest = require('supertest');

describe('Reviews Route', function () {

    var app, Review;

    beforeEach('Sync DB', function () {
        return db.sync({ force: true });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        Review = db.model('review');
    })

    var newReview = {
      rating: 5,
      description: 'COMPELLING',
      characterId: 1
    }
    beforeEach('Create review', function(done) {
      Review.create(newReview)
      .then(() => done())
      .catch(done)
    })

    var guestAgent;

    beforeEach('Create guest agent', function() {
      guestAgent = supertest.agent(app)
    })

    it('should get with 200 response and with an array as the body', function(done) {
      guestAgent.get('/api/reviews/?character=1').expect(200).end(function (err, response) {
        if (err) return done(err);
        expect(response.body).to.be.an('array')
        done();
      })
    })
});
