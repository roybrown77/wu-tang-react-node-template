var mongoose = require('mongoose');
var HomeSchema = new mongoose.Schema({
    address1: String,
    zipCode: String,
});
module.exports = mongoose.model('Home', HomeSchema);