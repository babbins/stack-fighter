var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var Character = db.model('character');

describe('Character model', function() {

    beforeEach('Sync DB', function() {
        return db.sync({
            force: true
        });
    });

    it('should exist', function() {
        expect(Character).to.be.a('object');
    });

    it('has a name, and price', function() {

        return Character.create({
                name: "Ali",
                price: '9001.00'
            })
            .then(function(testChar) {
                expect(testChar.name).to.equal('Ali');
                expect(testChar.price).to.equal('9001.00');
            })

    });

    it('requires a name and a price', function() {

        var fakeChar = Character.build({
            name: 555,
            price: ['coolBeans']
        })

        return fakeChar.validate()
            .then(function(result) {
                expect(result).to.be.an.instanceOf(Error);
            });

    });

    it('can handle long content', function() {

        var longContent = "Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret.Lorem ipsum doloret."

        return Character.create({
                name: "Ali",
                price: '9001.00',
                description: longContent
            })
            .then(function(testChar) {
                expect(testChar.name).to.equal('Ali');
                expect(testChar.price).to.equal('9001.00');
                expect(testChar.description).to.equal(longContent);
            })


    });

    it('cannot have stats over 11', function(){

        var fakeChar = Character.build({
            name: "Ali",
            price: '9001.00',
            strength: 11,
            speed: 11,
            intelligence: 11,
            luck: 11
        });

        return fakeChar.validate()
            .then(function(result) {
                expect(result).to.be.an.instanceOf(Error);
            });

    })


});