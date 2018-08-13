var mongoose = require('mongoose');
var GameSchema = new mongoose.Schema({
	leagueId: mongoose.Schema.Types.ObjectId,
	weekNo: Number,
	weekNumberDisplay: String,
	namePrefix: String,
	year: Number,
    beginDateTime: 'date',
    endDateTime: 'date',
    year: Number,
    seasonType: Number,
    description: String
});
module.exports = mongoose.model('Game_Week', GameSchema);