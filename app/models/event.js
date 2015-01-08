// app/models/event.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for the competition model
var eventSchema = new mongoose.Schema({
    name: String,
    league: {type: mongoose.Schema.Types.ObjectId, ref: 'League'}
});

// create the model and expose the Competition model to our app
module.exports = mongoose.model('Event', eventSchema);