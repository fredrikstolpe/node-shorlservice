var express = require('express'),
  router = express.Router(),
  validate = require('express-validation'),
  validation = require('../../validation/'),
  GenericResponse = require('../../models/GenericResponse'),
  config = require('../../config'),
  multer = require('multer'),
  crypto = require('crypto'),
  mime = require('mime'),
  shorlRepo = require('../../modules/shorl-repository.js');
  //upload = multer({ dest: config.uploadPath });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.uploadPath)
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

var upload = multer({ storage: storage });

module.exports = function() {
  router.post('/', upload.single('image'), function (req, res, next) {
    shorlRepo.createShorlForUrl(req.file.filename)
    .then(function(value){
      res.send(new GenericResponse(true, null, value));  
    },function(err){
      next(new Error(err));
    });
  });
  return router;
}