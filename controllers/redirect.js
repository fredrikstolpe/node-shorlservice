var express = require('express'),
  router = express.Router(),
  GenericResponse = require('../models/GenericResponse'),
  jsonfile = require('jsonfile'),
  config = require('../config'),
  shorlRepo = require('../modules/shorl-repository');

module.exports = function() {

  /**
   * Get subdomain
   */
  router.get('*', function(req, res, next) {
    var subdomain = getSubdomainFromRequest(req);
    if (subdomain == null) next(new Error("Subdomain missing"));
    else{

      shorlRepo.getUrlForShorl(subdomain)
      .then(function(value){
        console.log(value)
        res.send(new GenericResponse(true, null, "gurka"));
      });
      //res.redirect('http://www.bazooka.se');
      res.send(new GenericResponse(true, null, "gurka"));
    }
    
    // Shorl.find().count(function (err, count) {
    //   console.log(count);
    // });

    

    /*jsonfile.readFile(config.shorlJsonFilePath,function(err, obj) {
      if (err) next(err)
      else{
        shorl = obj[req.params.shorl];
        res.send(new GenericResponse(true, null, shorl));
      }
    });*/

    /*console.log(req.param);
    Shorl.findOne({ 'shorl': req.params.shorl }, function (err, shorl) {
      if (err) next(err);
      else{
        res.send(new GenericResponse(true, null, shorl));
      }
    });*/
  });

// app.use('*', function(req, res, next){
//   res.send(new GenericResponse(true, null, true));
// });

  return router;
}

function getSubdomainFromRequest(req){
  var subdomain = null;
  if (req.subdomains != null && req.subdomains.length > 0){
    subdomain = req.subdomains[0];
  }
  return subdomain;
}