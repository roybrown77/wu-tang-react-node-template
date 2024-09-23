var mongoose = require('mongoose');
var AlbumSchema = new mongoose.Schema({
    title: String,
    artist: String,
    releaseDate: Date,
});
module.exports = mongoose.model('Album', AlbumSchema);