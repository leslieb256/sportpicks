var mongoose = require('mongoose');

// Function to convert time to corret timezones.
function convertTime(time,inZone,outZone){
    var moment = require('moment-timezone');
    console.log("ORIGTIME: %s",time);
    if (time === undefined){
        return undefined;
    }
    else {
        var inTime = moment.tz(time, inZone);
        var outTime = inTime.clone().tz(outZone);
        console.log("NEWTIME: %s",outTime.format());
        return outTime.format();
    }
}


//update League
function updateLeagues(){
    var League = require('../models/league');
    League.update({name:'Super Rugby'},
        {$set:{
            sponsor:'Investec'
        }},
        {upsert:true},
        function (err){
            if (err) console.log("League update Error:"+err.toString());
        }
    );
}

//update Event
function updateEvent(){
    var Event = require('../models/event');
    var League = require('../models/league');
    League.findOne({name:"Super Rugby"}, function (err, league) {
        if (err) console.log("ERROR:"+err.toString());
        else {
            Event.update({name:'2015 Season'},
                {$set: {league: league._id}},
                {upsert:true},
                function (err){
                    if (err) console.log("Event update Error:"+err.toString());
                }                
            );
        }
    });
}

function loadCompetitions(){
    var Event = require('../models/event');
    var League = require('../models/league');
    var Competition = require('../models/competition');
    var User = require('../models/user');

    User.findOne({'local.email': "darcy@araitanga.com"}, function (err, user) {
        if (err) console.log("ERROR:"+err.toString());
        else{
            
            User.findOne({'local.email': "leslie@araitanga.com"}, function (err, user2) {
                if (err) console.log("ERROR:"+err.toString());
                else{
            
                    League.findOne({'name': "Super Rugby"}, function (err, league) {
                        if (err) console.log("ERROR:"+err.toString());
                        else{
                            
                            Event.findOne({'name': "2015 Season"}, function (err, event) {
                                if (err) console.log("ERROR:"+err.toString());
                                else{
                            
                                    Competition.create({
                                        name: 'Wellington City Council',
                                        usersAccepted: [user2.id],
                                        league: league._id,
                                        event: event._id
                                    });
                                }
                            });
                            
                        }
                    });
                }
            });
            
        }
        
    });
}


// update TEAMS
function updateTeams(){
    console.log('updating teams');
    var Team = require('../models/team');    
    var League = require('../models/league');    

    League.findOne({name:"Super Rugby"}, function (err, league) {
        Team.update({name: 'Brumbies'},{$set: {shtname:'Brumbies', shtcode:'BRM',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Melbourne Rebels'},{$set: {shtname:'Rebels', shtcode:'REB',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'New South Wales Waratahs'},{$set: {shtname:'Waratahs', shtcode:'WAR',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Queensland Reds'},{$set: {shtname:'Reds', shtcode:'RED',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Western Force'},{$set: {shtname:'Force', shtcode:'FOR',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Blues'},{$set: {shtname:'Blues', shtcode:'BLU',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Chiefs'},{$set: {shtname:'Chiefs', shtcode:'CHF',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Crusaders'},{$set: {shtname:'Crusaders', shtcode:'CRU',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Highlanders'},{$set: {shtname:'Highlanders', shtcode:'HLR',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Hurricanes'},{$set: {shtname:'Hurricanes', shtcode:'HUR',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Bulls'},{$set: {shtname:'Bulls', shtcode:'BUL',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Central Cheetahs'},{$set: {shtname:'Cheetahs', shtcode:'CTH',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Lions'},{$set: {shtname:'Lions', shtcode:'LNS',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Sharks'},{$set: {shtname:'Sharks', shtcode:'SHK',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Stormers'},{$set: {shtname:'Stormers', shtcode:'STM',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
    });   
}

//update ROUNDS
function updateRounds(leagueName, eventName){
    var League = require('./app/models/league');
    var Event = require('./app/models/event');
    var Round = require('./app/models/round');
    console.log('updating rounds');
    var roundList = [
        {name:'Round 1',type: 'fixture', roundPosition: 1, firstFixture: "2015-02-13 19:35", lastFixture: "2015-02-16 18:05", ffTimeZone: "Pacific/Auckland"},
        {name:'Round 2',type: 'fixture', roundPosition: 2, firstFixture: "2015-02-20 19:35", lastFixture: "2015-02-22 06:10", ffTimeZone: "Pacific/Auckland"},
        {name:'Round 3',type: 'fixture', roundPosition: 3, firstFixture: "2015-02-27 19:35", lastFixture: "2015-03-01 06:10", ffTimeZone: "Pacific/Auckland"},
        {name:'Round 4',type: 'fixture', roundPosition: 4, firstFixture: "2015-03-06 19:35", lastFixture: "2015-03-08 06:10", ffTimeZone: "Pacific/Auckland"},
        {name:'Round 5',type: 'fixture', roundPosition: 5, firstFixture: "2015-03-13 19:35", lastFixture: "2015-03-15 04:05", ffTimeZone: "Pacific/Auckland"},
        {name:'Round 6',type: 'fixture', roundPosition: 6, firstFixture: "2015-03-20 19:35", lastFixture: "2015-03-22 18:05", ffTimeZone: "Pacific/Auckland"},
        {name:'Round 7',type: 'fixture', roundPosition: 7, firstFixture: "2015-03-27 19:35", lastFixture: "2015-03-29 06:10", ffTimeZone: "Pacific/Auckland"},
        {name:'Round 8',type: 'fixture', roundPosition: 8, firstFixture: "2015-04-03 19:35", lastFixture: "2015-04-05 03:05", ffTimeZone: "Pacific/Auckland"},
        {name:'Round 9',type: 'fixture', roundPosition: 9, firstFixture: "2015-04-10 19:35", lastFixture: "2015-04-12 03:05", ffTimeZone: "Pacific/Auckland"},
        {name:'Round 10',type: 'fixture', roundPosition: 10, firstFixture: "2015-04-17 19:35", lastFixture: "2015-04-19 05:10", ffTimeZone: "Pacific/Auckland"},
        {name:'Round 11',type: 'fixture', roundPosition: 11, firstFixture: "2015-04-24 19:35", lastFixture: "2015-04-26 18:05", ffTimeZone: "Pacific/Auckland"},
        {name:'Round 12',type: 'fixture', roundPosition: 12, firstFixture: "2015-05-01 19:35", lastFixture: "2015-05-03 05:10", ffTimeZone: "Pacific/Auckland"},
        {name:'Round 13',type: 'fixture', roundPosition: 13, firstFixture: "2015-05-08 19:35", lastFixture: "2015-05-10 01:00", ffTimeZone: "Pacific/Auckland"},
        {name:'Round 14',type: 'fixture', roundPosition: 14, firstFixture: "2015-05-15 19:35", lastFixture: "2015-05-17 05:10", ffTimeZone: "Pacific/Auckland"},
        {name:'Round 15',type: 'fixture', roundPosition: 15, firstFixture: "2015-05-22 19:35", lastFixture: "2015-05-24 05:10", ffTimeZone: "Pacific/Auckland"},
        {name:'Round 16',type: 'fixture', roundPosition: 16, firstFixture: "2015-05-29 19:35", lastFixture: "2015-05-31 05:10", ffTimeZone: "Pacific/Auckland"},
        {name:'Round 17',type: 'fixture', roundPosition: 17, firstFixture: "2015-06-05 19:35", lastFixture: "2015-06-07 03:05", ffTimeZone: "Pacific/Auckland"},
        {name:'Round 18',type: 'fixture', roundPosition: 18, firstFixture: "2015-06-12 19:35", lastFixture: "2015-06-14 05:10", ffTimeZone: "Pacific/Auckland"},
    ];
    
    League.findOne({name:leagueName}, function (err, league) {
        if (err) console.log("ERROR:"+err.toString());
        else {
        
            Event.findOne({name:eventName}, function (err, event) {
                if (err) console.log("ERROR:"+err.toString());
                else {
                    roundList.forEach(function(roundData){
                        Round.update({name: roundData.name,
                            league: league._id,
                            event: event._id},
                            {$set: {roundPosition: roundData.roundPosition, type:roundData.type, closeDate:(convertTime(roundData.firstFixture, roundData.ffTimeZone,"UTC")),lastFixtureDate:(convertTime(roundData.lastFixture, roundData.ffTimeZone,"UTC"))}},
                            {upsert: true},
                            function(err){
                                if (err) console.log("Round update Error:"+err.toString());                                
                            }
                        );
                    });
                }
            });
        }
    });
}



mongoose.connect('mongodb://golog:gogogadget@kahana.mongohq.com:10088/tipping2');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback(){
    //updateLeagues(); DONE
    //updateEvent(); DONE 2015
    loadCompetitions();
    //updateTeams();
    //updateRounds('Super Rugby','2015 Season');
    console.log("done");
});