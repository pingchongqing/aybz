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
  /**
  *定义BzclsSchema
  */
  var BzclsSchema = mongoose.Schema({
    path: String,
    icon: String,
    clsname: String,
    data: Array
  });

  /**
  *将BzclsSchema发布为Model
  */
  //mongoose.model('class', BzclsSchema);

  var BzclsModel = db.model('CLS', BzclsSchema, 'class');

router.get('/', function(req, res) {

    /*
    *如果带有查询字段
    *name=ajnv
    */
    if(req.query.name) {
      BzclsModel.find( {path: req.query.name}, function(err, bzcls) {
        res.send(bzcls);
      });
    }

    else{
      BzclsModel.find( {
        "_id": {$exists: true},
        "path": {$exists: true},
        "icon": {$exists: true},
        "clsname": {$exists: true}
       }, function(err, bzcls) {
        res.send(bzcls);
      }).sort({"clsname":1});
    }

});

router.get('/all',function(req,res) {
  BzclsModel.find({})
  .then(function(cls){
    res.send(cls);
  });
});

router.get('/search', function(req,res) {
  var searchcls = [];
  BzclsModel.find({})
  .then(function(cls){
    cls.map(function(clsb){
      clsb.data.map(function(clsc){
        if(clsc.text.indexOf(req.query.bzname)>-1||clsc.descrip.indexOf(req.query.bzname)>-1) {
          searchcls.push(clsc);
        }
      })
    })
    res.send(searchcls);
  });
});

module.exports = router;
