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
    points: Number,
    cummulativePoints: Number,
    cummulativePointAll: [Number]
});

// methods ======================



// create the model for users and expose it to our app
module.exports = mongoose.model('Point', pointSchema);