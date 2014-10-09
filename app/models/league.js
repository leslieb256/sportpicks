// app/models/league.js
// load the things we need
var mongoose = require('mongoose');

var leagueSchema = new mongoose.Schema({
    name: String,
    logo: String,
    sponsor: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('League', leagueSchema);