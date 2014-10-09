// app/models/fixture.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for the user model
var fixtureSchema = new mongoose.Schema({
    type: String, //match | goldenboot | eventwinner
    homeTeam: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    awayTeam: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    winner: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    homeScore: Number,
    awayScore: Number,
    scoreDifference: Number,
    homePenaltySO: Number,
    awayPenaltySO: Number,
    homeTeamLeaguePoints: Number,
    awayTeamLeaguePoints: Number,
    round: {type: mongoose.Schema.Types.ObjectId, ref: 'Round'},
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
    date: Date,
    closeDate: Date
});


// methods ======================
//get the picks for the fixture
fixtureSchema.methods.rounds = function(cb){
    var Round = require('./round');
    return Round.find({event:this.event}, cb);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Fixture', fixtureSchema);