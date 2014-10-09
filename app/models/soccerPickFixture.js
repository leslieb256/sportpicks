// app/models/soccerPickFixture.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for the soccerpicks model
var soccerPickFixtureSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    competition: {type: mongoose.Schema.Types.ObjectId, ref: 'Competition'},
    round: {type: mongoose.Schema.Types.ObjectId, ref: 'Round'},
    fixture:{type: mongoose.Schema.Types.ObjectId, ref: 'Fixture'},
    winner:{type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    scoreDifference: Number, 
    goldenboot: {type: mongoose.Schema.Types.ObjectId, ref: 'Player'},
    eventWinner: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    homeScore: Number,
    awayScore: Number
});


// methods ======================


// create the model for users and expose it to our app
module.exports = mongoose.model('soccerPickFixture', soccerPickFixtureSchema);