var express = require('express'),
  router = express.Router(),
  validate = require('express-validation'),
  validation = require('../../validation/'),
  Shorl = require('../../models/Shorl'),
  GenericResponse = require('../../models/GenericResponse'),
  jsonfile = require('jsonfile'),
  config = require('../../config');

module.exports = function() {
    
  /**
   * Get url from shorl
   */
  router.get('/:shorl', function(req, res, next) {
    // Shorl.find().count(function (err, count) {
    //   console.log(count);
    // });
    jsonfile.readFile(config.shorlJsonFilePath,function(err, obj) {
      if (err) next(err)
      else{
        shorl = obj[req.params.shorl];
        res.send(new GenericResponse(true, null, shorl));
      }
    });
    /*console.log(req.param);
    Shorl.findOne({ 'shorl': req.params.shorl }, function (err, shorl) {
      if (err) next(err);
      else{
        res.send(new GenericResponse(true, null, shorl));
      }
    });*/
  });

  /**
   * Create a shorl without redirect url for later use
   */
  router.post('/', validate(validation.shorl.post), function(req, res, next) {
    var shorl = new Shorl({
      shorl: req.body.shorl
    });
    shorl.save(function(err, entry) {
      if (err) next(err);
      else{
        res.send(new GenericResponse(true, null, entry));
      }
    });
  });

  /**
   * Save url to shorl
   */
  router.put('/:shorl', validate(validation.shorl.put), function(req, res, next) {
      Shorl.findOne({ 'shorl': req.params.shorl }, function (err, shorl) {
        //Check if not url set
        if (err) next(err);
        else{
          shorl.url = req.body.url;
          shorl.save(function(err, entry) {
            if (err) next(err);
            else{
              res.send(new GenericResponse(true, null, entry));
            }
          });
        }
      });
  });

  /**
   * Create shorl
   */
  /*
  router.post('/', validate(validation.users.post), function(req, res, next) {
 
    try{
      var user = new User({
        rfid: req.body.rfid,
        userInfo: {
          firstName: req.body.userInfo.firstName,
          lastName: req.body.userInfo.lastName,
          email: req.body.userInfo.email
        },
        credits: {
          casinoCredits: 200,
          drinkTickets: 5
        }
      });
    }
    catch(err){
      next(err);
    }
    user.save(function(err, user) {
      if (err) next(err);
      else{
        res.send(new GenericResponse(true, null, user));
      }
    });
  });
  */

  return router;
}
