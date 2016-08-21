var request = require('request'),
		cheerio = require('cheerio'),
		cheerioTableparser = require('cheerio-tableparser'),
		Iconv = require('iconv').Iconv,
		nodemailer = require('nodemailer');
		// iconv = new Iconv('EUC-KR', 'UTF-8');
		// iconv  = require('iconv-lite');
		//
var models = require('./models'),
		config = require('./config');
		// aws = require('./aws')


var data = [];

var $mainBoardTR = '.boardlist tbody tr'


var checkIsNewBoard = function(){
	request({
    url : 'http://gachon.ac.kr/community/opencampus/03.jsp?pageNum=0&pageSize=1&boardType_seq=358&approve=&secret=&answer=&branch=&searchopt=&searchword=',
    encoding : 'binary',
    qs : {
    	pageNum : 0,
    	pageSize : 1,
    	boardType_seq : 358
    }
  }, function(err, resp, body){
  	var $ = cheerio.load(body);
		var nowPostId = 10;

  	$($mainBoardTR).each(function(){
  		var td = $(this).children();
  		var row = {};
  		td.each(function(index, element){
  			if(index == 0) {
  				!isNaN(Number($(this).html())) ? nowPostId = Number($(this).html()) : nowPostId = '';
  			}


  			// console.log('index : ', index);
  			// console.log('item : ', $(this).html());
  			// console.log('----------', index)
  		});
  		// console.log('row : ', row)
  		// console.log('nowPostId : ', nowPostId)

			data.push(row);
  		// console.log('td :', td.html())
  		console.log('###########################')
  	});
      // console.log('data : ', data)

  	// sendEmail();
  });
}

// checkIsNewBoard();

var sendEmail = function(){
	// var transporter = nodemailer.createTransport("SMTP", {
	// 	service: 'Gmail',
	// 	auth: {
	// 		user: config.gMail.user,
	// 		pass: config.gMail.pass
	// 	}
	// });
}

!function(){
	request({
    url : 'http://gachon.ac.kr/community/opencampus/03.jsp?boardType_seq=358',
    url : 'http://gachon.ac.kr/community/opencampus/03.jsp?pageNum=1&pageSize=10&boardType_seq=358&approve=&secret=&answer=&branch=&searchopt=&searchword=',
    encoding : 'binary'
  }, function (err, resp, body) {
    if (err) {
    	console.error("err", err)
    } else {

	 	  var strContents = new Buffer(body, 'binary');
	 	  iconv = new Iconv('UTF8', 'UTF8')
	 	  strContents = iconv.convert(strContents).toString();
  		// encodeing = new Iconv('euc-kr', 'UTF8')
  		// body = iconv.convert(body).toString()

	    // iconv.extendNodeEncodings();
			// var strContents = new Buffer(body);

    	var $ = cheerio.load(strContents);



    	$('.boardlist tbody tr').each(function(){
    		var td = $(this).children();
    		var row = {};
    		td.each(function(index, element){
    			if(index == 0) row.post_id = $(this).html();
    			if(index == 1) row.post_title = $(this).html();
    			if(index == 4) row.post_date = $(this).html();
    			// console.log('index : ', index);
    			// console.log('item : ', $(this).html());
    			// console.log('----------', index)
    		});
    		console.log('row : ', row)
    		models.POSTS.create({
    			postId : row.post_id,
    			postTitle : row.post_title,
    			postContent : row.post_title
    		})
  			data.push(row);
    		// console.log('td :', td.html())
    		// console.log('###########################')
    	});

    	console.log('data : ', data)

    }
  });

};

