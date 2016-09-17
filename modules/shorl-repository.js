var jsonfile = require('jsonfile'),
  config = require('../config'),
  Q = require('q');

var shorls = null;

function assertJson(){
  var deferred = Q.defer();
  if (shorls == null){
    jsonfile.readFile(config.shorlJsonFilePath,function(err, obj) {
      if (err) deferred.reject(err);
      else{
        shorls = obj;
        deferred.resolve();
      }
    });
  }
  else{
    console.log("File already loaded");
    deferred.resolve();
  }
  return deferred.promise;
}

module.exports = {
  getShorl: function(){
    var deferred = Q.defer();
    assertJson().then(function(){
      console.log(shorls.length);
      var rnd = Math.floor(Math.random()*shorls.length);
      var shorl = shorls.splice(rnd,1);
       jsonfile.writeFile(config.shorlJsonFilePath, shorls, function (err) {
         if (err) deferred.reject(err);
         else{
           console.log("File saved");
           deferred.resolve(shorl);
         }
       });
    },function(err){
      deferred.reject(err);
    });
    return deferred.promise;
  }
};