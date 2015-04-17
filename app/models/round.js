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
    firstFixtureDate: Date,
    type: String,
    numberOfFixtures: Number
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Round', roundSchema);