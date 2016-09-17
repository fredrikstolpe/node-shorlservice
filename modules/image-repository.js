var fs = require('fs'),
  config = require('../config'),
  Q = require('q'),
  mime = require('mime');

module.exports = {
  getImageByShorl: function(shorl){
    var deferred = Q.defer();
    var filePath = config.uploadPath + shorl + '.png';
    fs.stat(filePath, function(err, stat){
      if (err) deferred.reject(err);
      else{
        fs.readFile(filePath, function(err, data){
          deferred.resolve({ mime: mime.lookup(filePath), data: data});
        });
      }
    });
    return deferred.promise;
  }
};