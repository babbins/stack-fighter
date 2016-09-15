var Promise = require('bluebird');
var db = require('./server/db/_db');
var Character = require('./server/db/models/character');
var Category = require('./server/db/models/category');
var User = require('./server/db/models/user');

var data = {
    character: [{
        name: 'Ryu',
        portrait: 'http://i.imgur.com/FOziwVc.gif',
        idleSprite: 'http://i.imgur.com/wtz9sU8.gif',
        description: 'Ryu made his debut in the first Street Fighter as the primary playable character in the game, with his best friend, rival, and sparring partner Ken Masters serving as the second player\'s character. Both compete in the tournament depicted in the game in order to test their strength against the tournament\'s champion, Sagat.',
        price: '500.00',
        strength: '7',
        intelligence: '6',
        speed: '7',
        luck: '6'
    }, {
        name: 'Chun-Li',
        portrait: 'http://i.imgur.com/tkTMk4D.gif',
        idleSprite: 'http://i.imgur.com/nKn9gC5.gif',
        description: ' In the series, she is an expert martial artist and Interpol officer who restlessly seeks revenge for the death of her father at the hands of the nefarious M. Bison, leader of the Shadaloo crime syndicate.',
        price: '500.00',
        strength: '6',
        intelligence: '5',
        speed: '8',
        luck: '5'
    }, {
        name: 'Sagat',
        portrait: 'http://i.imgur.com/OmGgwTW.gif',
        idleSprite: 'http://i.imgur.com/o8QA5bL.gif',
        description: 'Sagat is depicted as a well-renowned muay thai expert known for his incredible power. He is often called the "Emperor of Muay Thai" in his home country. It is possible he was named after Sagat Petchyindee.',
        price: '500.00',
        strength: '6',
        intelligence: '5',
        speed: '8',
        luck: '5'
    }, {
        name: 'Vega',
        portrait: 'http://i.imgur.com/ULa7ell.gif',
        idleSprite: 'http://i.imgur.com/MAkSxva.gif',
        description: 'Vega is a mask-wearing, claw-wielding fighter from Spain who uses a personal fighting style combining Japanese ninjutsu, French savate, American Zipota and Spanish bullfighting, earning him the nickname of "Spanish Ninja".',
        price: '500.00',
        strength: '3',
        intelligence: '5',
        speed: '9',
        luck: '3'
    }, {
        name: 'Balrog',
        portrait: 'http://i.imgur.com/cQnA8xL.gif',
        idleSprite: 'http://i.imgur.com/4iVh41W.gif',
        description: 'Balrog is generally self-centered, hot-tempered, arrogant and sadistic. He is a belligerent pugilist who possesses an insatiable urge for money and a vicious, bullying mean streak, often refusing to take responsibility for his actions. Despite being a once great prize boxer, Balrog has intentionally cheated in his fights whenever he felt like it, and has even killed one of his opponents.',
        price: '500.00',
        strength: '8',
        intelligence: '3',
        speed: '8',
        luck: '6'
    }, {
        name: 'Guile',
        portrait: 'http://i.imgur.com/DyPYeAz.gif',
        idleSprite: 'http://i.imgur.com/1gdmCYs.gif',
        description: 'Guile first appears in Street Fighter II (1991) as one of the eight selectable characters featured in the first release of the game. Guile leaves his country and family to enter the World Warrior tournament to avenge the death of his friend Charlie, who was killed by M. Bison, the tournament\'s sponsor, sometime before the events of the game. In his ending, he defeats Bison, but is dissuaded from killing him by his wife and their daughter.',
        price: '500.00',
        strength: '7',
        intelligence: '4',
        speed: '8',
        luck: '6'
    }, {
        name: 'Akuma',
        portrait: 'http://i.imgur.com/LEvw3MV.gif',
        idleSprite: 'http://i.imgur.com/qTJOy9w.gif',
        description: 'Akuma and his brother Gouken were students of Goutetsu. Goutetsu taught a nameless life-threatening martial art, which incorporates elements of Karate, Judo, and Kempo. He also taught the Shun Goku Satsu (literally Instant Hell Murder), a lethal technique which, although incredibly powerful, puts the user in considerable danger.As the brothers progressed under Goutetsu\'s tutelage, a dispute arose on the true nature of their fighting style and the path to master it. Gouken, unable to accept the violent nature and the Satsui no Hado of his fighting style, left Goutetsu to begin his own dojo, which Goutetsu did not oppose. Akuma continued Goutetsu\'s teachings, and vowed to use their fighting style as it was intended.',
        price: '1000.00',
        strength: '10',
        intelligence: '10',
        speed: '10',
        luck: '2'
    }, {
        name: 'Blanka',
        portrait: 'http://i.imgur.com/aVh3fvh.gif',
        idleSprite: 'http://i.imgur.com/x3f46kv.gif',
        description: ' Bruce Banner theorizes that gamma radiation caused Blanka\'s mutations, as they did his. He is also seen in the background of one stage, sitting in front of a campfire, in a crouch and face affixed in a snarl, across from The Beast, who mirrors his expression.',
        price: '1000.00',
        strength: '8',
        intelligence: '2',
        speed: '9',
        luck: '6'
    }, {
        name: 'Bison',
        portrait: 'http://i.imgur.com/cQnA8xL.gif',
        idleSprite: 'http://i.imgur.com/RhpRdA9.gif',
        description: 'M. Bison is an archetypal villain motivated by his own self-seeking interests and lust for absolute power through world domination. He is a ruthless, arrogant and unforgiving dictator who seeks to rule the world with an iron fist whilst also being universally regarded as the greatest and most powerful martial artist of all time.',
        price: '1000.00',
        strength: '8',
        intelligence: '8',
        speed: '4',
        luck: '4'
    }, {
        name: 'Zangief',
        portrait: 'http://i.imgur.com/Hp4pUTx.gif',
        idleSprite: 'http://i.imgur.com/4iVh41W.gif',
        description: 'Zangief is a massive fighter, weighing 400 lbs and standing slightly over 7 feet tall, placing him among the tallest characters in the entire Street Fighter roster.',
        price: '1000.00',
        strength: '10',
        intelligence: '3',
        speed: '5',
        luck: '5'
    }],
    category: [{
        type: 'game',
        value: 'SFII'
    }, {
        type: 'game',
        value: 'SFIII'
    }, {
        type: 'game',
        value: 'SFIV'
    }, {
        type: 'game',
        value: 'SFIII:Alpha'
    }, {
        type: 'game',
        value: 'MarvelVsCapcom2'
    }, {
        type: 'game',
        value: 'MarvelVsCapcom3'
    }, {
        type: 'allegiance',
        value: 'good'
    }, {
        type: 'allegiance',
        value: 'evil'
    }, {
        type: 'allegiance',
        value: 'neutral'
    }, {
        type: 'gender',
        value: 'male'
    }, {
        type: 'gender',
        value: 'female'
    }],
    user: [{
        email: 'admin@admin.com',
        isAdmin: true,
        password: 'admin',
        first_name: 'Admin',
        last_name: 'Mcadminson'
    }, {
        email: 'user@user.com',
        isAdmin: false,
        password: 'user',
        first_name: 'User',
        last_name: 'Mcuserson'
    }]
};

db.sync({
        force: true
    })
    .then(function() {
        console.log('Dropping old data, inserting new data');
        return Promise.map(Object.keys(data), function(name) {
            return Promise.map(data[name], function(item) {
                return db.model(name)
                    .create(item);
            });
        });
    })
    .then(function() {
        console.log('finished inserting data');
    })
    .catch(function(err) {
        console.error('Error:', err, err.stack);
    })
    .finally(function() {
        db.close();
        console.log('connection closed');
        return null;
    });