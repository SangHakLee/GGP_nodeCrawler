var Q = require('q');
var request = require('request');
var cheerio = require('cheerio');
 
Q().then(function () {
  var defer = Q.defer();
 
  request({
    // url: 'https://github.com/MatthewMueller/cheerio'
    url : 'http://gachon.ac.kr/community/opencampus/03.jsp?boardType_seq=358'
  }, function (err, resp, body) {
    if (err) {
      defer.reject(err);
    } else {
      // console.log('body', body)

      defer.resolve(body);
    }
  });
 
  return defer.promise;
}).then(function (body) {
  var defer = Q.defer();
  var $ = cheerio.load(body);
 
  // defer.resolve($('#readme').attr('class').toString());
  defer.resolve($('.boardlist tbody tr'));
  
  return defer.promise;
}).then(function (classStr) {
  // classStr.each(function(){
  //   console.log( $(this) );
  // });
  func(classStr);
  // console.log("classStr : ", classStr);
});

var func = function(classStr){
  console.log(classStr.toString())
  var $ = cheerio.load(classStr);
  console.log('td', $('td').html() );
  

  classStr.each(function(){
    var td = $(this).find("td").text();
  })

  // console.log("classStr : ", classStr['0'].children[0].next);
  var length = classStr.length // tr 개수 
  // console.log("length : ", length);
  // for(var i = 0 ; i < length ; i++){
  //   console.log("a : " , i);
  // }
}

