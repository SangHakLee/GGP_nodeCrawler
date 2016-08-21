'use strict';

var config = require('../config');
var Sequelize = require('sequelize');
var path = require('path');

var sequelize = new Sequelize(config.sequelize.database, config.sequelize.username, config.sequelize.password, {
	host: config.rdsEndpointHost,
	logging : false,
	dialect : 'mysql',
	timezone : '+09:00',
	define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  }
});


var db = {};



db['POSTS'] = sequelize.import(path.join(__dirname, 'posts.js'));
db['POSTS_STATS'] = sequelize.import(path.join(__dirname, 'posts_stats.js'));
db['BOARDS'] = sequelize.import(path.join(__dirname, 'boards.js'));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.POSTS.sync();
db.BOARDS.sync();


module.exports = db;