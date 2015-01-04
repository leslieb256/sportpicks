// app/models/competition.js
// load the things we need
var mongoose = require('mongoose');
var async = require('async');

// define the schema for the competition model
var competitionSchema = new mongoose.Schema({
    name: String,
    usersAccepted: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    league: {type: mongoose.Schema.Types.ObjectId, ref: 'League'},
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
    scoring: [{type: mongoose.Schema.Types.Mixed}] // See notes at bottom of page for notes on scoring options.
});

//create the model for Competitions


// methods ======================
// list the competitions the user is in
competitionSchema.statics.userCompetitions = function(userId,cb){
    console.log("DPRECIATED FUNCTTION FROM COMPETITION.JS PLEASE REWRITE TO REMOVE")
    var Event = require('./event');
    var League = require('./league');
    return this.find({usersAccepted:userId}, cb).populate('event league');
};

// get the users ranks
competitionSchema.statics.userRanking = function(userId,cb){
    var Point = require('./point');
    return Point.find({user:userId, type:'event'}, cb);
};

//get the rounds for the compeitition
competitionSchema.methods.rounds = function(cb){
    var Round = require('./round');
    return Round.find({event:this.event}, cb);
};



// create the model and expose the Competition model to our app
module.exports = mongoose.model('Competition', competitionSchema);

/**
 * =====================
 * SCORING OPTIONS =====
 * =====================
 * 
 * How the difference scoing options are implemented
 * 
 * scoreDifference
 * ---------------
 * margins: the schema is loaded with the top end of each margin, for
 * example if the margins are draw (0), 1-15, 16-24, 24-30, 30+ the schema for
 * margins would be: [0,15,24,30]
 * If the user selects 30+ the userPick will be recorded as -1.
 * winner: needs to be set to true or false. This determines whether the winner
 * (or draw) needs to be correctly selected before points are awarded for the 
 * margin pick.
 * 
 * 
 * 
 * 
 **/