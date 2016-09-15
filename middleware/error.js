var GenericResponse = require('../models/GenericResponse');

module.exports = function(err, req, res, next) {
  console.log(err);
  
  var response = new GenericResponse(false, err, null);
  
  res.status(err.status || 500);

  res.json(response);
};