'use strict';

var models = require('./index');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('KEYWORDS', {
		keyword : {
			type : DataTypes.STRING,
			allowNull : false
		},
    board_id : {
      type: DataTypes.INTEGER,
      allowNull : false
    }
	}, {
    classMethods: {},
    // tableName: 'publisher',
    freezeTableName: true,
    underscored: true,
    // timestamps: false,
    hooks: {
      // beforeCreate: function() {
      //   /** create작업 전에 해야할 사항들. **/
      //   console.log('######[publisher] beforeCreate hooks triggered');
      // },
      // afterCreate: function() {
      //   /** create작업 후에 해야할 사항들. **/
      //   console.log('######[publisher] afterCreate hooks triggered');
      // },
      // beforeBulkUpdate: function() {
      //   /** create작업 후에 해야할 사항들. **/
      //   console.log('######[publisher] beforeUpdate hooks triggered');
      // },
      // afterBulkUpdate: function() {
      //   /** create작업 후에 해야할 사항들. **/
      //   console.log('######[publisher] afterUpdate hooks triggered');
      // },
      // beforeBulkDestroy: function() {
      //   /** create작업 후에 해야할 사항들. **/
      //   console.log('######[publisher] beforeDestroy hooks triggered');
      // },
      // afterBulkDestroy: function() {
      //   /** create작업 후에 해야할 사항들. **/
      //   console.log('######[publisher] afterDestroy hooks triggered');
      // }
    }
  });
};