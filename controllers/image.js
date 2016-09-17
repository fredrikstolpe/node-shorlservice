var express = require('express'),
  router = express.Router(),
  validate = require('express-validation'),
  validation = require('../validation/'),
  GenericResponse = require('../models/GenericResponse'),
  config = require('../config'),
  multer = require('multer'),
  crypto = require('crypto'),
  mime = require('mime'),
  shorlRepo = require('../modules/shorl-repository.js');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.uploadPath);
  },
  filename: function (req, file, cb) {
    shorlRepo.getShorl().then(function(shorl){
      cb(null, shorl + '.' + mime.extension(file.mimetype));
    },function(err){
      console.log(err);
    });
  }
});

var upload = multer({ storage: storage });

module.exports = function() {

  /**
   * Post - upload image
   */
  router.post('/', upload.single('image'), function (req, res, next) {
    var filename = req.file.filename;
    var shorl = filename.substring(0,filename.indexOf("."));
    res.send(new GenericResponse(true, null, shorl));    
  });

  return router;
}