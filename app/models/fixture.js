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
    closeDate: Date,
    poolName: String,
    homeTries: Number, // used for rugby points often bonus points are given for tries number
    awayTries: Number // used for rugby points often bonus points are given for tries number
});


// methods ======================
//get the picks for the fixture
fixtureSchema.methods.rounds = function(cb){
    var Round = require('./round');
    return Round.find({event:this.event}, cb);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Fixture', fixtureSchema);

/**
 * 
 * Fixture type determines what type of fixture it is. Usually it is
 * "Match" denoting a fixutre where the user needs to select things based on
 * the competition type.
 * Another type is "Bye" where a team may not be in a round but still
 * score points. This is included so that league points for a team may
 * be tracked even though it is invisible to the user.
 * 
 **/