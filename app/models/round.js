// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for the user model
var roundSchema = new mongoose.Schema({
    name: String,
    roundPosition: Number,
    league: {type: mongoose.Schema.Types.ObjectId, ref: 'League'},
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
    closeDate: Date, //latest closing date, based on datetime of first fixture
    lastFixtureDate: Date,
    type: String,
    numberOfFixtures: Number
});

// methods ======================
// get the users ranks
roundSchema.statics.userRanking = function(userId,cb){
    var Point = require('./point');
    return Point.find({user:userId, type:'round'}, cb).sort('roundPosition');
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Round', roundSchema);