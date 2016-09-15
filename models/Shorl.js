var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 
var shorlSchema = new Schema({
  url: { type: String, unique: true },
  shorl: { type: String, unique: true }
});

var Shorl = mongoose.model('Shorl', shorlSchema);

module.exports = Shorl;