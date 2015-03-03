// app/models/statistics.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for the soccerpicks model
var StatisticsSchema = new mongoose.Schema({
    fixture:{type: mongoose.Schema.Types.ObjectId, ref: 'Fixture'}, // if DEFINED then this statistic is related to a specific fixture
    round: {type: mongoose.Schema.Types.ObjectId, ref: 'Round'}, // if DEFINED then this statistic is related to a specific round
    event:{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}, // if DEFINED then this statistic is related to a specific event
    team:{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}, // if DEFINED then this statistic is related to a specific team
    competition: {type: mongoose.Schema.Types.ObjectId, ref: 'Competition'}, // is this is DEFINED then the statistic is only relevent for a particular competition.
    data : [{type: mongoose.Schema.Types.Mixed}], // see below how this is formatted
    type: String // type of statistic
});


// methods ======================


// create the model for users and expose it to our app
module.exports = mongoose.model('statistic', StatisticsSchema);

// How the statistics are stored.
/**
     homeTeamId: homeTeam number
     awayTeamId: awayTeamNumber
 }
 * 
 * 
 **/