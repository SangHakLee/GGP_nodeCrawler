var schedule = require('node-schedule');
var moment = require('moment');
var crawler = require('./boardCrawler');




var j = schedule.scheduleJob('*/30 * * * *', function(){ // 30분 마다
  console.log('가천대 크롤러');
  console.log('now : ', moment().format('YYYY MM DD HH:mm:ss') );

  crawler.getAllBoard()
	.then(function(boards){
			// console.log('boards : ', boards);
			return crawler.updateRecent(boards);
	})
	.then(function(results){
			// console.log('results 2: ', results);

	})
});