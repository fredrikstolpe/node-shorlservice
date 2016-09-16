var jsonfile = require('jsonfile'),
  config = require('../config'),
  Q = require('q');

var shorls = null;

function assertJson(){
  var deferred = Q.defer();
  if (shorls == null){
    jsonfile.readFile(config.shorlJsonFilePath,function(err, obj) {
      console.log("Reading file");
      shorls = obj;
      deferred.resolve();
    });
  }
  else{
    console.log("Returning instantly");
    deferred.resolve(resolve);
  }
  return deferred.promise;
}

module.exports = {
  
  getUrlForShorl: function(shorl){
    var deferred = Q.defer();
    assertJson().then(function(){
      deferred.resolve(shorls[shorl]);
    });
    return deferred.promise;
  },

  createShorlForUrl: function(url){
    var deferred = Q.defer();
    assertJson().then(function(){
      var found = false;
      for (key in shorls){
        if (shorls[key] == null){
          found = true;
          shorls[key] = url;
          jsonfile.writeFile(config.shorlJsonFilePath, shorls, function (err) {
            if (err) deferred.reject(err);
            else{
              deferred.resolve(key);
            }
          });
        }
      }
      if (!found){
        deferred.reject("No keys left");
      }
    });
    return deferred.promise;
  }

};