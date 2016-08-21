var winston = require('winston');
var time = require('time');

var logger = new winston.Logger({
  transports:[
    new winston.transports.Console({
        level:'info',
        colorize:false
    }),
    new winston.transports.DailyRotateFile({
        level:'debug',
        filename:'crawler_log_',
        maxsize:1024,
        datePattern:'yyyy-MM-dd.log',
        timestamp:function(){
            var timezone = time.currentTimezone; // Asia/Seoul
            var now = new time.Date();
            now.setTimezone(timezone);
            return now.toString();
        }
    })
  ]
});

module.exports = logger;