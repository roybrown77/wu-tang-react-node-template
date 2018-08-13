var mongoose = require('mongoose');
var GameSchema = new mongoose.Schema({
	leagueId: mongoose.Schema.Types.ObjectId,
	weekNo: Number,
    startDateTime: 'date',
    station: String,
    isGameOver: mongoose.Schema.Types.Boolean,
    competitors: Array,
    seasonType: Number,
    year: Number,
    spread: mongoose.Schema.Types.Mixed
});
module.exports = mongoose.model('Game', GameSchema);