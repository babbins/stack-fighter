var Promise = require('bluebird');
var db = require('./_db');
var Character = require('./models/character');
var Category = require('./models/category');
var User = require('./models/user');

var data = {
    character:
    [
        {name:  'Ryu', portrait: 'http://imgur.com/AhIHGg7',  price:  '500.00',  strength: '7',  intelligence: '6',  speed: '7',  luck:  '6'},
        {name:  'Chun-Li', portrait: 'http://imgur.com/xoQ21Fa',  price:  '500.00',  strength: '6',  intelligence: '5',  speed: '8',  luck:  '5'},
        {name:  'Sagat', portrait:  'http://imgur.com/9C17Piq', price:  '500.00',  strength: '6',  intelligence: '5',  speed: '8',  luck:  '5'},
        {name:  'Vega', portrait:  'http://imgur.com/PtwyC5S', price:  '500.00',  strength: '3',  intelligence: '5',  speed: '9',  luck:  '3'},
        {name:  'Balrog', portrait:  'http://imgur.com/Htn0TEx', price:  '500.00',  strength: '8',  intelligence: '3',  speed: '8',  luck:  '6'},
        {name:  'Guile', portrait:  'http://imgur.com/jDKVlai', price:  '500.00',  strength: '7',  intelligence: '4',  speed: '8',  luck:  '6'},
        {name:  'Akuma', portrait: 'http://imgur.com/NHOmUpU', price: '1000.00', strength: '10', intelligence: '10', speed: '10', luck: '2'},
        {name:  'Blanka', portrait: 'http://imgur.com/Z46SkfV', price: '1000.00', strength: '8', intelligence: '2', speed: '9', luck: '6'},
        {name:  'Bison', portrait: 'http://imgur.com/hGZqK5C', price: '1000.00', strength: '8', intelligence: '8', speed: '4', luck: '4'},
        {name:  'Zangief', portrait: 'http://imgur.com/Jal26u4', price: '1000.00', strength: '10', intelligence: '3', speed: '5', luck: '5'}
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
