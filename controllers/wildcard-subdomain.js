var express = require('express'),
  router = express.Router(),
  imageRepo = require('../modules/image-repository');

module.exports = function() {

  /**
   * Get subdomain
   */
  router.get('*', function(req, res, next) {
    var subdomain = getSubdomainFromRequest(req);
    if (subdomain == null) next(new Error("Subdomain missing"));
    else{
      imageRepo.getImageByShorl(subdomain)
      .then(function(value){
        res.contentType(value.mime);
        res.write(value.data);
        res.end();
      },function(err){
        res.send("<h1>Arrh, sorry, no image here :-(</h1>");
      });
    } 
  });
  
  return router;
}

function getSubdomainFromRequest(req){
  var subdomain = null;
  if (req.subdomains != null && req.subdomains.length > 0){
    subdomain = req.subdomains[0];
  }
  return subdomain;
}