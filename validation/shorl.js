var Joi = require('joi');

module.exports = {
  get: {
    param: {
      shorl: Joi.string().required()
    }
  }
};
