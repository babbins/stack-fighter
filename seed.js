var Promise = require('bluebird');
var db = require('./server/db/_db');
var Character = require('./server/db/models/character');
var Category = require('./server/db/models/category');
var User = require('./server/db/models/user');

var data = {
    character:
    [
        {name:  'Ryu', portrait: 'http://i.imgur.com/iITFQiW.gif',  price:  '500.00',  strength: '7',  intelligence: '6',  speed: '7',  luck:  '6'},
        {name:  'Chun-Li', portrait: 'http://i.imgur.com/L46gV15.gif',  price:  '500.00',  strength: '6',  intelligence: '5',  speed: '8',  luck:  '5'},
        {name:  'Sagat', portrait:  'http://i.imgur.com/DFySye9.gif', price:  '500.00',  strength: '6',  intelligence: '5',  speed: '8',  luck:  '5'},
        {name:  'Vega', portrait:  'http://i.imgur.com/PesE1pk.gif', price:  '500.00',  strength: '3',  intelligence: '5',  speed: '9',  luck:  '3'},
        {name:  'Balrog', portrait:  'http://i.imgur.com/K0TCjKL.gif', price:  '500.00',  strength: '8',  intelligence: '3',  speed: '8',  luck:  '6'},
        {name:  'Guile', portrait:  'http://i.imgur.com/JAruVte.gif', price:  '500.00',  strength: '7',  intelligence: '4',  speed: '8',  luck:  '6'},
        {name:  'Akuma', portrait: 'http://i.imgur.com/aX23iNU.gif', price: '1000.00', strength: '10', intelligence: '10', speed: '10', luck: '2'},
        {name:  'Blanka', portrait: 'http://i.imgur.com/HKOng8Y.gif', price: '1000.00', strength: '8', intelligence: '2', speed: '9', luck: '6'},
        {name:  'Bison', portrait: 'http://i.imgur.com/D8v15cI.gif', price: '1000.00', strength: '8', intelligence: '8', speed: '4', luck: '4'},
        {name:  'Zangief', portrait: 'http://i.imgur.com/J59oKyv.gif', price: '1000.00', strength: '10', intelligence: '3', speed: '5', luck: '5'}
    ],
    category:
    [
        {type: 'game', value: 'SFII'},
        {type: 'game', value: 'SFIII'},
        {type: 'game', value: 'SFIV'},
        {type: 'game', value: 'SFIII:Alpha'},
        {type: 'game', value: 'MarvelVsCapcom2'},
        {type: 'game', value: 'MarvelVsCapcom3'},
        {type: 'allegiance', value: 'good'},
        {type: 'allegiance', value: 'evil'},
        {type: 'allegiance', value: 'neutral'},
        {type: 'gender', value: 'male'},
        {type: 'gender', value: 'female'}
    ],
    user: [
        {email: 'admin@admin.com', isAdmin: true, password: 'admin', first_name: 'Admin', last_name: 'Mcadminson'},
        {email: 'user@user.com', isAdmin: false, password: 'user', first_name: 'User', last_name: 'Mcuserson'}
    ]
};

db.sync({force: true})
.then(function(){
    console.log('Dropping old data, inserting new data');
    return Promise.map(Object.keys(data), function(name) {
        return Promise.map(data[name], function(item) {
            return db.model(name)
                .create(item);
        });
    });
})
.then(function(){
    console.log('finished inserting data');
})
.catch(function(err){
    console.error('Error:', err, err.stack);
})
.finally(function(){
    db.close();
    console.log('connection closed');
    return null;
});
