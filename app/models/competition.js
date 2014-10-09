// app/models/competition.js
// load the things we need
var mongoose = require('mongoose');
var async = require('async');

// define the schema for the competition model
var competitionSchema = new mongoose.Schema({
    name: String,
    usersAccepted: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    league: {type: mongoose.Schema.Types.ObjectId, ref: 'League'},
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'}
});
//create the model for Competitions


// methods ======================
// list the competitions the user is in
competitionSchema.statics.userCompetitions = function(userId,cb){
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