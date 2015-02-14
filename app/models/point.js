// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for the user model
var pointSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    type: String, // fixture | round | event
    competition: {type: mongoose.Schema.Types.ObjectId, ref: 'Competition'},
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
    round:{type: mongoose.Schema.Types.ObjectId, ref: 'Round'},
    fixture: {type: mongoose.Schema.Types.ObjectId, ref: 'Fixture'},
    ranking: Number,
    points: Number, // records the points for the round
    pointsHistory: [Number], // records the points for the rounds up to this one
    cummulativePoints: Number, // records the total points up to this round
    cummulativePointsHistory: [Number], // records the total points by round up to this one
    historyTitles: [String] // records the round names up to this one
});

// methods ======================



// create the model for users and expose it to our app
module.exports = mongoose.model('Point', pointSchema);