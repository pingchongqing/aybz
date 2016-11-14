var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/**
*连接到数据库aybz
*/
var db = mongoose.createConnection('localhost', 'aybz');
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console,'连接错误：'));
db.once('open', function() {

});
var ArticleSchema = mongoose.Schema({
  bzurl: String,
  bztext: String
});
var ArticleModel = db.model('Article', ArticleSchema, 'article');



router.get('/', function(req, res) {

  if(req.query.bzurl) {
    ArticleModel.find( {bzurl: req.query.bzurl}, function(err, atc) {
      res.send(atc);
    });
  }

  else{
    res.send('输入查询条件');
  }

});

router.get('/all',function(req,res){
  let showAll = ArticleModel.find({});
  showAll.then(function(data){
    res.send(data);
  });
});

router.post('/',function(req,res){
  ArticleModel.update({bzurl:req.body.bzurl},{
    $set:{
      "bztext": req.body.bztext
    }
  })
  .then(function(data) {
    res.send(data)
  });
});

module.exports = router;
