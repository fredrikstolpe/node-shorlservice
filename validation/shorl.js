var Joi = require('joi');

module.exports = {
  get: {
    params: {
      shorl: Joi.string().required()
    }
  },
  post: {
    body: {
      shorl: Joi.string().required()
    }
  },
  put: {
    body: {
      url: Joi.string().required()
    }
  }
};
