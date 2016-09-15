var express = require('express'),
  router = express.Router(),
  validate = require('express-validation'),
  validation = require('../../validation/'),
  Shorl = require('../../models/Shorl'),
  GenericResponse = require('../../models/GenericResponse');

module.exports = function() {

  /**
   * Get url from shorl
   */
  router.get('/:shorl', function(req, res, next) {

    /*
    var shorl = new Shorl({
      shorl: 'gurka'
    });
    shorl.save(function(err, shorl) {
      if (err) next(err);
      else{
        console.log(shorl);
      }
    });*/


    Shorl.find().count(function (err, count) {
      console.log(count);
    });
    Shorl.findOne({ 'shorl': req.query.shorl }, function (err, shorl) {
      if (err) next(err);
      else{
        res.send(new GenericResponse(true, null, shorl));
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
