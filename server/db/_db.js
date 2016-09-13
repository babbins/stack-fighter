var path = require('path');
var Sequelize = require('sequelize');

var env = require(path.join(__dirname, '../env'));
console.log('DATABASEURI', env.DATABASE_URI);
var db = new Sequelize(env.DATABASE_URI, {
  logging: env.LOGGING,
  native: env.NATIVE
});

module.exports = db;
