var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
var eventproxy = require('eventproxy');
var path = require('path');
var url = require('url');

var app = express();
app.get('/', function(reqg, resg, next){


  /* 获取入口数据
  var dataUrl = 'http://115.159.217.111/enter.html';
  superagent.get(dataUrl).end(
    function(err,res){
      if(err){
        return console.log(err);
      }
      var $ = cheerio.load(res.text);
      var datas = $('ul li');
      var items = [];
      for( var i = 0; i<datas.length; i++) {
        items.push({
          href: datas[i].children[0].attribs.href,
          imgsrc: datas[i].children[0].children[0].attribs.src,
          text: datas[i].children[0].children[1].data
        });
      }
      console.log(items);
    }
  );
  */
  /*获得病症简介数据*/
  var urlbase = 'http://m.ayskjaj.cn';
  var bzUrls = [
    'http://115.159.217.111/cjbz1.html',
    'http://115.159.217.111/nxaj.html',
    'http://115.159.217.111/nanxaj.html',
    'http://115.159.217.111/ajmrj.html',
    'http://115.159.217.111/ajjf.html'
  ];
  var items = [];
//  var itemUrls = [
//    "http://m.ayskjaj.com/health/detail.aspx?id=286",
//    "http://m.ayskjaj.com/health/detail.aspx?id=285"
//  ];
  var itemUrls = [];
  var epf = new eventproxy();
  epf.after('bz_list', bzUrls.length, function (bzlists) {
    bzlists = bzlists.map(function(bzPair){
      var bzUrl = bzPair[0];
      var bzHtml = bzPair[1];
      var $ = cheerio.load(bzHtml);
      var datas = $("ul li");

      for( var i = 0; i<datas.length; i++) {
        items.push({
          href: urlbase+datas[i].children[0].attribs.href,
          imgsrc: datas[i].children[0].children[0].children[0].attribs.src,
          text: datas[i].children[0].children[1].children[0].children[0].data,
          descrip: datas[i].children[0].children[1].children[1].children[0].data
        });
        itemUrls.push(urlbase+datas[i].children[0].attribs.href);
      }


    });

//resg.send(items);  输出所以分类信息
  //  console.log(itemUrls);


    var ep = new eventproxy();
     ep.after('bz_html', itemUrls.length, function (bzcontents) {
       bzcontents = bzcontents.map(function(bzPair){
         var bzUrl = bzPair[0];
         var bzHtml = bzPair[1];
         var $ = cheerio.load(bzHtml);
         var bzText = $(".tlCon").eq(0).html();
         return ({
           bzurl: bzUrl,
           bztext: bzText
         });
       });
       //console.log(bzPair);
       resg.send(bzcontents);  
     });
     itemUrls.forEach(function(itemurl){
       superagent.get(itemurl)
       .end(function(erre, rese){
         if(erre){
           return console.log(erre);
         }
         console.log(itemurl+'  isok');
         //console.log(rese.text);
         ep.emit('bz_html', [itemurl, rese.text]);
       });
     });



  });

  bzUrls.forEach(function(urls) {
    superagent.get(urls).end(
      function(err,res){
        if(err){
          return console.log(err);
        }
      console.log(urls+'  isok');
    //  console.log(itemUrls.length);
    //  resg.send(itemUrls);
      //  return ( itemUrls );
      epf.emit('bz_list', [urls, res.text]);
      });
  });






  });




app.listen(3008,function(){
  console.log('port 3008 is working');
});
