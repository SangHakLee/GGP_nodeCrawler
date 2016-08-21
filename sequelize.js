var config = require('./config');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.sequelize.database, config.sequelize.username, config.sequelize.password, {
	host: config.rdsEndpointHost,
	port: config.rdsEndpointPort,
	dialect : 'mysql',
	define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
  logging : false
});



// console.log("aa : ", config.sequelize.database)

var POSTS = sequelize.define('POSTS', {
	postId : {
		type : Sequelize.INTEGER,
		allowNull : false
	},
	postTitle : {
		type: Sequelize.STRING,
		allowNull : false
	},
	postContent: {
		type: Sequelize.TEXT,
		allowNull : false
	}
}, {
	freezeTableName: true
});

POSTS.sync()
.then(function(){
	return POSTS.create({
		postId : 111,
		postTitle : '제목',
		postContent : '내용'
	})
})

// var User = sequelize.define('user', {
//   firstName: {
//     type: Sequelize.STRING,
//     field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
//   },
//   lastName: {
//     type: Sequelize.STRING
//   }
// }, {
//   freezeTableName: true // Model tableName will be the same as the model name
// });

// User.sync({force: true}).then(function () {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });