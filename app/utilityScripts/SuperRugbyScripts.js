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
                {$set: {league: league._id, lastFixtureDate:(convertTime('2015-07-05 00:00',"Pacific/Auckland","UTC"))}},
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
                                        name: 'WCC Finance',
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
        /**Team.update({name: 'Brumbies'},{$set: {shtname:'Brumbies', shtcode:'BRM',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
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
        Team.update({name: 'Stormers'},{$set: {shtname:'Stormers', shtcode:'STM',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())}); **/
        Team.update({name: 'Draw',league:league},{$set: {shtname:'Draw', shtcode:'DRW'}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});        
    });   
}

//update ROUNDS
function updateRounds(leagueName, eventName){
    var League = require('../models/league');
    var Event = require('../models/event');
    var Round = require('../models/round');
    console.log('updating rounds');
    var roundList = [
        {name:'Round 1',type: 'fixture', roundPosition: 1, firstFixture: "2015-02-13 19:35", lastFixture: "2015-02-16 18:05", ffTimeZone: "Pacific/Auckland",numberOfFixtures:7},
        {name:'Round 2',type: 'fixture', roundPosition: 2, firstFixture: "2015-02-20 19:35", lastFixture: "2015-02-22 06:10", ffTimeZone: "Pacific/Auckland",numberOfFixtures:7},
        {name:'Round 3',type: 'fixture', roundPosition: 3, firstFixture: "2015-02-27 19:35", lastFixture: "2015-03-01 06:10", ffTimeZone: "Pacific/Auckland",numberOfFixtures:7},
        {name:'Round 4',type: 'fixture', roundPosition: 4, firstFixture: "2015-03-06 19:35", lastFixture: "2015-03-08 06:10", ffTimeZone: "Pacific/Auckland",numberOfFixtures:6},
        {name:'Round 5',type: 'fixture', roundPosition: 5, firstFixture: "2015-03-13 19:35", lastFixture: "2015-03-15 04:05", ffTimeZone: "Pacific/Auckland",numberOfFixtures:7},
        {name:'Round 6',type: 'fixture', roundPosition: 6, firstFixture: "2015-03-20 19:35", lastFixture: "2015-03-22 18:05", ffTimeZone: "Pacific/Auckland",numberOfFixtures:6},
        {name:'Round 7',type: 'fixture', roundPosition: 7, firstFixture: "2015-03-27 19:35", lastFixture: "2015-03-29 06:10", ffTimeZone: "Pacific/Auckland",numberOfFixtures:7},
        {name:'Round 8',type: 'fixture', roundPosition: 8, firstFixture: "2015-04-03 19:35", lastFixture: "2015-04-05 03:05", ffTimeZone: "Pacific/Auckland",numberOfFixtures:6},
        {name:'Round 9',type: 'fixture', roundPosition: 9, firstFixture: "2015-04-10 19:35", lastFixture: "2015-04-12 03:05", ffTimeZone: "Pacific/Auckland",numberOfFixtures:6},
        {name:'Round 10',type: 'fixture', roundPosition: 10, firstFixture: "2015-04-17 19:35", lastFixture: "2015-04-19 05:10", ffTimeZone: "Pacific/Auckland",numberOfFixtures:7},
        {name:'Round 11',type: 'fixture', roundPosition: 11, firstFixture: "2015-04-24 19:35", lastFixture: "2015-04-26 18:05", ffTimeZone: "Pacific/Auckland",numberOfFixtures:7},
        {name:'Round 12',type: 'fixture', roundPosition: 12, firstFixture: "2015-05-01 19:35", lastFixture: "2015-05-03 05:10", ffTimeZone: "Pacific/Auckland",numberOfFixtures:7},
        {name:'Round 13',type: 'fixture', roundPosition: 13, firstFixture: "2015-05-08 19:35", lastFixture: "2015-05-10 01:00", ffTimeZone: "Pacific/Auckland",numberOfFixtures:6},
        {name:'Round 14',type: 'fixture', roundPosition: 14, firstFixture: "2015-05-15 19:35", lastFixture: "2015-05-17 05:10", ffTimeZone: "Pacific/Auckland",numberOfFixtures:6},
        {name:'Round 15',type: 'fixture', roundPosition: 15, firstFixture: "2015-05-22 19:35", lastFixture: "2015-05-24 05:10", ffTimeZone: "Pacific/Auckland",numberOfFixtures:7},
        {name:'Round 16',type: 'fixture', roundPosition: 16, firstFixture: "2015-05-29 19:35", lastFixture: "2015-05-31 05:10", ffTimeZone: "Pacific/Auckland",numberOfFixtures:7},
        {name:'Round 17',type: 'fixture', roundPosition: 17, firstFixture: "2015-06-05 19:35", lastFixture: "2015-06-07 03:05", ffTimeZone: "Pacific/Auckland",numberOfFixtures:7},
        {name:'Round 18',type: 'fixture', roundPosition: 18, firstFixture: "2015-06-12 19:35", lastFixture: "2015-06-14 05:10", ffTimeZone: "Pacific/Auckland",numberOfFixtures:7}, 
        {name:'Qualifiers',type: 'fixture', roundPosition: 19, firstFixture: "2015-06-19 00:00", lastFixture: "2015-06-20 00:00", ffTimeZone: "Pacific/Auckland",numberOfFixtures:2},
        {name:'Semi Finals',type: 'fixture', roundPosition: 20, firstFixture: "2015-06-19 00:00", lastFixture: "2015-06-27 00:00", ffTimeZone: "Pacific/Auckland",numberOfFixtures:2}, 
        {name:'Final',type: 'fixture', roundPosition: 21, firstFixture: "2015-07-04 00:00", lastFixture: "2015-07-04 00:00", ffTimeZone: "Pacific/Auckland",numberOfFixtures:1}, 
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
                            {$set: {roundPosition: roundData.roundPosition, type:roundData.type, closeDate:(convertTime(roundData.firstFixture, roundData.ffTimeZone,"UTC")),lastFixtureDate:(convertTime(roundData.lastFixture, roundData.ffTimeZone,"UTC")), numberOfFixtures:roundData.numberOfFixtures}},
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

function updateFixture(leagueName, eventName){
    var League = require('../models/league');
    var Event = require('../models/event');
    var Round = require('../models/round');
    var Team = require('../models/team');
    var Fixture = require('../models/fixture');

    var fixtureList = [

        // *** ROUND 1 ***
        {homeSht:'CRU',awaySht:'REB',date: convertTime("2015-02-13 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 1',type: 'match'},
        {homeSht:'BRM',awaySht:'RED',date: convertTime("2015-02-13 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 1',type: 'match'},
        {homeSht:'LNS',awaySht:'HUR',date: convertTime("2015-02-14 06:10", "Pacific/Auckland","UTC"),roundName: 'Round 1',type: 'match'},
        {homeSht:'BLU',awaySht:'CHF',date: convertTime("2015-02-14 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 1',type: 'match'},
        {homeSht:'SHK',awaySht:'CTH',date: convertTime("2015-02-15 04:05", "Pacific/Auckland","UTC"),roundName: 'Round 1',type: 'match'},
        {homeSht:'BUL',awaySht:'STM',date: convertTime("2015-02-15 06:10", "Pacific/Auckland","UTC"),roundName: 'Round 1',type: 'match'},
        {homeSht:'WAR',awaySht:'FCE',date: convertTime("2015-02-15 18:05", "Pacific/Auckland","UTC"),roundName: 'Round 1',type: 'match'},


        // *** ROUND 2 ***        
        {homeSht:'CHF',awaySht:'BRM',date: convertTime("2015-02-20 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 2',type: 'match'},
        {homeSht:'REB',awaySht:'WAR',date: convertTime("2015-02-20 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 2',type: 'match'},
        {homeSht:'BUL',awaySht:'HUR',date: convertTime("2015-02-21 06:10", "Pacific/Auckland","UTC"),roundName: 'Round 2',type: 'match'},
        {homeSht:'HLR',awaySht:'CRU',date: convertTime("2015-02-21 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 2',type: 'match'},
        {homeSht:'RED',awaySht:'FCE',date: convertTime("2015-02-21 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 2',type: 'match'},
        {homeSht:'STM',awaySht:'BLU',date: convertTime("2015-02-22 04:05", "Pacific/Auckland","UTC"),roundName: 'Round 2',type: 'match'},
        {homeSht:'SHK',awaySht:'LNS',date: convertTime("2015-02-22 06:10", "Pacific/Auckland","UTC"),roundName: 'Round 2',type: 'match'},

        // *** ROUND 3 ***        
        {homeSht:'HLR',awaySht:'RED',date: convertTime("2015-02-27 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 3',type: 'match'},
        {homeSht:'FCE',awaySht:'HUR',date: convertTime("2015-02-28 12:00", "Pacific/Auckland","UTC"),roundName: 'Round 3',type: 'match'},
        {homeSht:'CTH',awaySht:'BLU',date: convertTime("2015-02-28 06:10", "Pacific/Auckland","UTC"),roundName: 'Round 3',type: 'match'},
        {homeSht:'CHF',awaySht:'CRU',date: convertTime("2015-02-28 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 3',type: 'match'},
        {homeSht:'REB',awaySht:'BRM',date: convertTime("2015-02-28 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 3',type: 'match'},
        {homeSht:'BUL',awaySht:'SHK',date: convertTime("2015-03-01 04:05", "Pacific/Auckland","UTC"),roundName: 'Round 3',type: 'match'},
        {homeSht:'LNS',awaySht:'STM',date: convertTime("2015-03-01 06:10", "Pacific/Auckland","UTC"),roundName: 'Round 3',type: 'match'},        

        // *** ROUND 4 ***                
        {homeSht:'CHF',awaySht:'HUR',date: convertTime("2015-03-06 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 4',type: 'match'},
        {homeSht:'BRM',awaySht:'FCE',date: convertTime("2015-03-06 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 4',type: 'match'},
        {homeSht:'BLU',awaySht:'LNS',date: convertTime("2015-03-07 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 4',type: 'match'},
        {homeSht:'RED',awaySht:'WAR',date: convertTime("2015-03-07 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 4',type: 'match'},
        {homeSht:'CTH',awaySht:'BUL',date: convertTime("2015-03-08 04:05", "Pacific/Auckland","UTC"),roundName: 'Round 4',type: 'match'},
        {homeSht:'STM',awaySht:'SHK',date: convertTime("2015-03-08 06:10", "Pacific/Auckland","UTC"),roundName: 'Round 4',type: 'match'},

        // *** ROUND 5 ***                
        {homeSht:'HUR',awaySht:'BLU',date: convertTime("2015-03-13 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 5',type: 'match'},
        {homeSht:'FCE',awaySht:'REB',date: convertTime("2015-03-14 12:00", "Pacific/Auckland","UTC"),roundName: 'Round 5',type: 'match'},
        {homeSht:'CRU',awaySht:'LNS',date: convertTime("2015-03-14 16:30", "Pacific/Auckland","UTC"),roundName: 'Round 5',type: 'match'},
        {homeSht:'HLR',awaySht:'WAR',date: convertTime("2015-03-14 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 5',type: 'match'},
        {homeSht:'RED',awaySht:'BRM',date: convertTime("2015-03-14 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 5',type: 'match'},
        {homeSht:'STM',awaySht:'CHF',date: convertTime("2015-03-15 02:00", "Pacific/Auckland","UTC"),roundName: 'Round 5',type: 'match'},
        {homeSht:'CTH',awaySht:'SHK',date: convertTime("2015-03-15 04:05", "Pacific/Auckland","UTC"),roundName: 'Round 5',type: 'match'},

        // *** ROUND 6 ***                
        {homeSht:'HLR',awaySht:'HUR',date: convertTime("2015-03-20 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 6',type: 'match'},
        {homeSht:'REB',awaySht:'LNS',date: convertTime("2015-03-20 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 6',type: 'match'},
        {homeSht:'CRU',awaySht:'CTH',date: convertTime("2015-03-21 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 6',type: 'match'},
        {homeSht:'BUL',awaySht:'FCE',date: convertTime("2015-03-22 04:05", "Pacific/Auckland","UTC"),roundName: 'Round 6',type: 'match'},
        {homeSht:'SHK',awaySht:'CHF',date: convertTime("2015-03-22 06:10", "Pacific/Auckland","UTC"),roundName: 'Round 6',type: 'match'},
        {homeSht:'WAR',awaySht:'BRM',date: convertTime("2015-03-22 18:05", "Pacific/Auckland","UTC"),roundName: 'Round 6',type: 'match'},

        // *** ROUND 7 ***                
        {homeSht:'HUR',awaySht:'REB',date: convertTime("2015-03-27 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 7',type: 'match'},
        {homeSht:'RED',awaySht:'LNS',date: convertTime("2015-03-27 22:00", "Pacific/Auckland","UTC"),roundName: 'Round 7',type: 'match'},
        {homeSht:'CHF',awaySht:'CTH',date: convertTime("2015-03-28 16:30", "Pacific/Auckland","UTC"),roundName: 'Round 7',type: 'match'},
        {homeSht:'HLR',awaySht:'STM',date: convertTime("2015-03-28 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 7',type: 'match'},
        {homeSht:'WAR',awaySht:'BLU',date: convertTime("2015-03-28 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 7',type: 'match'},
        {homeSht:'SHK',awaySht:'FCE',date: convertTime("2015-03-29 04:05", "Pacific/Auckland","UTC"),roundName: 'Round 7',type: 'match'},
        {homeSht:'BUL',awaySht:'CRU',date: convertTime("2015-03-29 06:10", "Pacific/Auckland","UTC"),roundName: 'Round 7',type: 'match'},

        // *** ROUND 8 ***                
        {homeSht:'HUR',awaySht:'STM',date: convertTime("2015-04-03 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 8',type: 'match'},
        {homeSht:'REB',awaySht:'RED',date: convertTime("2015-04-03 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 8',type: 'match'},
        {homeSht:'CHF',awaySht:'BLU',date: convertTime("2015-04-04 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 8',type: 'match'},
        {homeSht:'BRM',awaySht:'CTH',date: convertTime("2015-04-04 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 8',type: 'match'},
        {homeSht:'SHK',awaySht:'CRU',date: convertTime("2015-04-05 02:00", "Pacific/Auckland","UTC"),roundName: 'Round 8',type: 'match'},
        {homeSht:'LNS',awaySht:'BUL',date: convertTime("2015-04-05 03:05", "Pacific/Auckland","UTC"),roundName: 'Round 8',type: 'match'},

        // *** ROUND 9 ***                
        {homeSht:'BLU',awaySht:'BRM',date: convertTime("2015-04-10 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 9',type: 'match'},
        {homeSht:'CRU',awaySht:'HLR',date: convertTime("2015-04-11 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 9',type: 'match'},
        {homeSht:'WAR',awaySht:'STM',date: convertTime("2015-04-11 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 9',type: 'match'},
        {homeSht:'FCE',awaySht:'CTH',date: convertTime("2015-04-11 23:45", "Pacific/Auckland","UTC"),roundName: 'Round 9',type: 'match'},
        {homeSht:'BUL',awaySht:'RED',date: convertTime("2015-04-12 01:00", "Pacific/Auckland","UTC"),roundName: 'Round 9',type: 'match'},
        {homeSht:'LNS',awaySht:'SHK',date: convertTime("2015-04-12 03:05", "Pacific/Auckland","UTC"),roundName: 'Round 9',type: 'match'},

        // *** ROUND 10 ***                
        {homeSht:'CRU',awaySht:'CHF',date: convertTime("2015-04-17 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 10',type: 'match'},
        {homeSht:'HUR',awaySht:'WAR',date: convertTime("2015-04-18 16:30", "Pacific/Auckland","UTC"),roundName: 'Round 10',type: 'match'},
        {homeSht:'HLR',awaySht:'BLU',date: convertTime("2015-04-18 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 10',type: 'match'},
        {homeSht:'BRM',awaySht:'REB',date: convertTime("2015-04-18 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 10',type: 'match'},
        {homeSht:'FCE',awaySht:'STM',date: convertTime("2015-04-18 23:45", "Pacific/Auckland","UTC"),roundName: 'Round 10',type: 'match'},
        {homeSht:'SHK',awaySht:'BUL',date: convertTime("2015-04-19 03:05", "Pacific/Auckland","UTC"),roundName: 'Round 10',type: 'match'},
        {homeSht:'CTH',awaySht:'RED',date: convertTime("2015-04-19 05:10", "Pacific/Auckland","UTC"),roundName: 'Round 10',type: 'match'},

        // *** ROUND 11 ***                
        {homeSht:'CHF',awaySht:'FCE',date: convertTime("2015-04-24 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 11',type: 'match'},
        {homeSht:'BRM',awaySht:'HLR',date: convertTime("2015-04-24 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 11',type: 'match'},
        {homeSht:'CRU',awaySht:'BLU',date: convertTime("2015-04-25 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 11',type: 'match'},
        {homeSht:'WAR',awaySht:'REB',date: convertTime("2015-04-25 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 11',type: 'match'},
        {homeSht:'LNS',awaySht:'CTH',date: convertTime("2015-04-26 03:05", "Pacific/Auckland","UTC"),roundName: 'Round 11',type: 'match'},
        {homeSht:'STM',awaySht:'BUL',date: convertTime("2015-04-26 05:10", "Pacific/Auckland","UTC"),roundName: 'Round 11',type: 'match'},
        {homeSht:'RED',awaySht:'HUR',date: convertTime("2015-04-26 18:05", "Pacific/Auckland","UTC"),roundName: 'Round 11',type: 'match'},

        // *** ROUND 12 ***                
        {homeSht:'HLR',awaySht:'SHK',date: convertTime("2015-05-01 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 12',type: 'match'},
        {homeSht:'BRM',awaySht:'WAR',date: convertTime("2015-05-01 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 12',type: 'match'},
        {homeSht:'BLU',awaySht:'FCE',date: convertTime("2015-05-02 17:30", "Pacific/Auckland","UTC"),roundName: 'Round 12',type: 'match'},
        {homeSht:'HUR',awaySht:'CRU',date: convertTime("2015-05-02 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 12',type: 'match'},
        {homeSht:'REB',awaySht:'CHF',date: convertTime("2015-05-02 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 12',type: 'match'},
        {homeSht:'CTH',awaySht:'STM',date: convertTime("2015-05-03 03:05", "Pacific/Auckland","UTC"),roundName: 'Round 12',type: 'match'},
        {homeSht:'BUL',awaySht:'LNS',date: convertTime("2015-05-03 05:10", "Pacific/Auckland","UTC"),roundName: 'Round 12',type: 'match'},

        // *** ROUND 13 ***                
        {homeSht:'CRU',awaySht:'RED',date: convertTime("2015-05-08 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 13',type: 'match'},
        {homeSht:'REB',awaySht:'BLU',date: convertTime("2015-05-08 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 13',type: 'match'},
        {homeSht:'STM',awaySht:'BRM',date: convertTime("2015-05-09 03:05", "Pacific/Auckland","UTC"),roundName: 'Round 13',type: 'match'},
        {homeSht:'HUR',awaySht:'SHK',date: convertTime("2015-05-09 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 13',type: 'match'},
        {homeSht:'FCE',awaySht:'WAR',date: convertTime("2015-05-09 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 13',type: 'match'},
        {homeSht:'LNS',awaySht:'HLR',date: convertTime("2015-05-10 01:00", "Pacific/Auckland","UTC"),roundName: 'Round 13',type: 'match'},

        // *** ROUND 14 ***                
        {homeSht:'BLU',awaySht:'BUL',date: convertTime("2015-05-15 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 14',type: 'match'},
        {homeSht:'RED',awaySht:'REB',date: convertTime("2015-05-15 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 14',type: 'match'},
        {homeSht:'HUR',awaySht:'CHF',date: convertTime("2015-05-16 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 14',type: 'match'},
        {homeSht:'WAR',awaySht:'SHK',date: convertTime("2015-05-16 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 14',type: 'match'},
        {homeSht:'LNS',awaySht:'BRM',date: convertTime("2015-05-17 03:05", "Pacific/Auckland","UTC"),roundName: 'Round 14',type: 'match'},
        {homeSht:'CTH',awaySht:'HLR',date: convertTime("2015-05-17 05:10", "Pacific/Auckland","UTC"),roundName: 'Round 14',type: 'match'},

        // *** ROUND 15 ***                
        {homeSht:'CHF',awaySht:'BUL',date: convertTime("2015-05-22 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 15',type: 'match'},
        {homeSht:'RED',awaySht:'SHK',date: convertTime("2015-05-22 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 15',type: 'match'},
        {homeSht:'BLU',awaySht:'HUR',date: convertTime("2015-05-23 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 15',type: 'match'},
        {homeSht:'WAR',awaySht:'CRU',date: convertTime("2015-05-23 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 15',type: 'match'},
        {homeSht:'FCE',awaySht:'HLR',date: convertTime("2015-05-23 23:45", "Pacific/Auckland","UTC"),roundName: 'Round 15',type: 'match'},
        {homeSht:'CTH',awaySht:'LNS',date: convertTime("2015-05-24 03:05", "Pacific/Auckland","UTC"),roundName: 'Round 15',type: 'match'},
        {homeSht:'STM',awaySht:'REB',date: convertTime("2015-05-24 05:10", "Pacific/Auckland","UTC"),roundName: 'Round 15',type: 'match'},

        // *** ROUND 16 ***                
        {homeSht:'CRU',awaySht:'HUR',date: convertTime("2015-05-29 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 16',type: 'match'},
        {homeSht:'BRM',awaySht:'BUL',date: convertTime("2015-05-29 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 16',type: 'match'},
        {homeSht:'SHK',awaySht:'REB',date: convertTime("2015-05-30 05:10", "Pacific/Auckland","UTC"),roundName: 'Round 16',type: 'match'},
        {homeSht:'HLR',awaySht:'CHF',date: convertTime("2015-05-30 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 16',type: 'match'},
        {homeSht:'FCE',awaySht:'RED',date: convertTime("2015-05-30 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 16',type: 'match'},
        {homeSht:'STM',awaySht:'CTH',date: convertTime("2015-05-31 03:05", "Pacific/Auckland","UTC"),roundName: 'Round 16',type: 'match'},
        {homeSht:'LNS',awaySht:'WAR',date: convertTime("2015-05-31 05:10", "Pacific/Auckland","UTC"),roundName: 'Round 16',type: 'match'},

        // *** ROUND 17 ***                
        {homeSht:'HUR',awaySht:'HLR',date: convertTime("2015-06-05 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 17',type: 'match'},
        {homeSht:'FCE',awaySht:'BRM',date: convertTime("2015-06-05 23:00", "Pacific/Auckland","UTC"),roundName: 'Round 17',type: 'match'},
        {homeSht:'REB',awaySht:'BUL',date: convertTime("2015-06-06 17:30", "Pacific/Auckland","UTC"),roundName: 'Round 17',type: 'match'},
        {homeSht:'BLU',awaySht:'CRU',date: convertTime("2015-06-06 19:25", "Pacific/Auckland","UTC"),roundName: 'Round 17',type: 'match'},
        {homeSht:'RED',awaySht:'CHF',date: convertTime("2015-06-06 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 17',type: 'match'},
        {homeSht:'CTH',awaySht:'WAR',date: convertTime("2015-06-07 01:00", "Pacific/Auckland","UTC"),roundName: 'Round 17',type: 'match'},
        {homeSht:'STM',awaySht:'LNS',date: convertTime("2015-06-07 03:05", "Pacific/Auckland","UTC"),roundName: 'Round 17',type: 'match'},

        // *** ROUND 18 ***                
        {homeSht:'BLU',awaySht:'HLR',date: convertTime("2015-06-12 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 18',type: 'match'},
        {homeSht:'REB',awaySht:'FCE',date: convertTime("2015-06-12 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 18',type: 'match'},
        {homeSht:'BRM',awaySht:'CRU',date: convertTime("2015-06-13 17:30", "Pacific/Auckland","UTC"),roundName: 'Round 18',type: 'match'},
        {homeSht:'CHF',awaySht:'HUR',date: convertTime("2015-06-13 19:35", "Pacific/Auckland","UTC"),roundName: 'Round 18',type: 'match'},
        {homeSht:'WAR',awaySht:'RED',date: convertTime("2015-06-13 21:40", "Pacific/Auckland","UTC"),roundName: 'Round 18',type: 'match'},
        {homeSht:'BUL',awaySht:'CTH',date: convertTime("2015-06-14 03:05", "Pacific/Auckland","UTC"),roundName: 'Round 18',type: 'match'},
        {homeSht:'SHK',awaySht:'STM',date: convertTime("2015-06-14 05:10", "Pacific/Auckland","UTC"),roundName: 'Round 18',type: 'match'},
/**
        // *** QUALIFERS ***
        {homeSht:'',awaySht:'',date: convertTime("2015-06-19", "Pacific/Auckland","UTC"),roundName: 'Qualifiers',type: 'match'},
        {homeSht:'',awaySht:'',date: convertTime("2015-06-20", "Pacific/Auckland","UTC"),roundName: 'Qualifiers',type: 'match'},
        
        // *** SEMI FINALS ***
        {homeSht:'',awaySht:'',date: convertTime("2015-06-26", "Pacific/Auckland","UTC"),roundName: 'Semi Finals',type: 'match'},
        {homeSht:'',awaySht:'',date: convertTime("2015-06-27", "Pacific/Auckland","UTC"),roundName: 'Semi Finals',type: 'match'},
        
        // *** FINALS
        {homeSht:'',awaySht:'',date: convertTime("2015-07-04", "Pacific/Auckland","UTC"),roundName: 'Final',type: 'match'},
**/     
        ];
        
    League.findOne({name:leagueName}, function (err, league) {
        if (err) console.log("ERROR:"+err.toString());
        else {
        
            Event.findOne({name:eventName}, function (err, event) {
                if (err) console.log("ERROR:"+err.toString());
                else {
                    fixtureList.forEach(function(fixtureData){
                        
                        Team.findOne({shtcode:fixtureData.homeSht}, function(err, homeTeam){
                            if (err) console.log("homeTeamERROR:"+err.toString());
                            else {
                                Round.findOne({name:fixtureData.roundName, event:event.id}, function(err, round){
                                    if (err) console.log("roundERROR:"+err.toString());
                                    else {
                                        
                                        Team.findOne({shtcode:fixtureData.awaySht}, function(err, awayTeam){
                                            if (err) console.log("awayTeamERROR:"+err.toString());
                                            else {
                                                Team.findOne({shtcode:fixtureData.winner}, function(err, winner){
                                                    if (err) console.log("awayTeamERROR:"+err.toString());
                                                    else {

                                                            //load a new set of rounds
                                                            Team.findOne({shtcode:fixtureData.winner}, function(err, winner){
                                                                Fixture.update({homeTeam: homeTeam, awayTeam: awayTeam, closeDate: fixtureData.date, event: event._id, league: league._id},
                                                                {$set:{round: round._id, type:'match'}},
                                                                    {upsert: true}, function(err) {if (err) console.log("Fixture update Error:"+err.toString())}
                                                                    );
                                                            });

   /**       

                                                            // load the results for the round
                                                            Team.findOne({shtcode:fixtureData.winner}, function(err, winner){
                                                                Fixture.update({homeTeam: homeTeam, awayTeam: awayTeam, closeDate: fixtureData.date, event: event._id, league: league._id},
                                                                {$set:{homeScore: fixtureData.homeScore, awayScore:fixtureData.awayScore, scoreDifference: fixtureData.scoreDifference,winner: winner,
                                                                    homeTeamLeaguePoints: fixtureData.homeTeamLeaguePoints, awayTeamLeaguePoints: fixtureData.awayTeamLeaguePoints, round: round._id}},
                                                                    {upsert: true}, function(err) {if (err) console.log("Fixture update Error:"+err.toString())}
                                                                    );
                                                            });

**/
                                                    }
                                                });

                                            }
                                        });

                                    }
                                });
                                
                            }
                        });
                        
                    });
                }
            });
        }
    });


}

function updateFixtureResult(){
    var Fixture = require('../models/fixture');
    var Team = require('../models/team');
    
    //https://en.wikipedia.org/wiki/2015_Super_Rugby_season#Fixtures
    
/**
 * Prior to 2011, Super Rugby was a round-robin competition where each team played with every other team once; 
 * a team had six or seven home games, and six or seven away games each. The winner received four competition points; 
 * if the game was a draw two points were awarded to each team. The Rugby union bonus points system was also used, 
 * where any team scoring four or more tries, and/or losing by less than seven points, receives an extra competition point. 
 * 
 **/
    
    var resultsList = [
        {   fixtureid:'54af2d35f1ace29007e4c10c', homeScore:17, awayScore:20, homeTeamLeaguePoints:1 , awayTeamLeaguePoints:4 }, //chf v hgh
        {   fixtureid:'54af2d35f1ace29007e4c0d9', homeScore:27, awayScore:15, homeTeamLeaguePoints: 5, awayTeamLeaguePoints:0 }, // brum fce
        {   fixtureid:'54af2d35f1ace29007e4c106', homeScore:10, awayScore:13, homeTeamLeaguePoints:1 , awayTeamLeaguePoints:4 }, // blu v lio
        {   fixtureid:'54af2d35f1ace29007e4c0bc', homeScore:5, awayScore:23, homeTeamLeaguePoints: 0, awayTeamLeaguePoints:4 }, // red nsw
        {   fixtureid:'54af2d35f1ace29007e4c0c3', homeScore:20, awayScore:39, homeTeamLeaguePoints:0 , awayTeamLeaguePoints:4 }, //cth bull
        {   fixtureid:'54af2d35f1ace29007e4c0e3', homeScore:34, awayScore:13, homeTeamLeaguePoints:4 , awayTeamLeaguePoints:0 }, // stm shk

        ];
        
        var super15DrawTeamId = '54dedf115d82d635c1c414e4';
        
        resultsList.forEach(function(result){
           Fixture.findById(result.fixtureid).exec(function(err,fixture){
               if(err){console.log('ERROR:%s',err)}
               else{
                   fixture.homeScore = result.homeScore;
                   fixture.awayScore = result.awayScore;
                   fixture.scoreDifference = Math.abs(result.homeScore-result.awayScore);
                   fixture.homeTeamLeaguePoints =result.homeTeamLeaguePoints;
                   fixture.awayTeamLeaguePoints = result.awayTeamLeaguePoints;
                   if(result.homeScore==result.awayScore){fixture.winner = super15DrawTeamId}
                   else {
                       if(result.homeScore>result.awayScore){fixture.winner=fixture.homeTeam}
                       else {fixture.winner=fixture.awayTeam}
                   }
                   fixture.save();
                   console.log('fixture %s updated',fixture.id);
               }
           });
        });
}



var dbUrl = 'mongodb://'+process.env.DATABASE_USER+':'+process.env.DATABASE_PASSWORD+'@'+process.env.DATABASE_SERVER+':'+process.env.DATABASE_PORT+'/'+process.env.DATABASE_NAME;
mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback(){
    //updateLeagues(); DONE
    //updateEvent(); 
    //loadCompetitions(); DONE 2015
    // updateTeams();// DONE 2015
    //updateRounds('Super Rugby','2015 Season'); //DONE 2015
    // updateFixture('Super Rugby','2015 Season');
    updateFixtureResult();

});

// nEED TO UPDATE EVENT LAST FICTURE, SEMIS AND QUALS AND FINALS ONCE DATE AND TIME IS KNOWN.

