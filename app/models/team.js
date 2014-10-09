// app/models/team.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for the team model
var teamSchema = new mongoose.Schema({
    name: String,
    logo: String,
    shtname: String,
    shtcode:String
});


// methods ======================



// create the model for users and expose it to our app
module.exports = mongoose.model('Team', teamSchema);