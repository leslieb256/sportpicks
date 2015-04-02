var mongoose = require('mongoose');
//var models = require('./models');
//var scoring = require('./scoring');

//update League
function updateLeagues(){
    var League = require('./app/models/league');
    models.League.update({name:'A-League'},
        {$set:{
            sponsor:'Hynudai'
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
    League.findOne({name:"A-League"}, function (err, league) {
        if (err) console.log("ERROR:"+err.toString());
        else {
            Event.update({name:'2014/15 Season'},
                {$set: {league: league._id, lastFixtureDate:(convertTime('2015-05-17 16:00',"Australia/Brisbane","UTC"))}},
                {upsert:true},
                function (err){
                    if (err) console.log("Event update Error:"+err.toString());
                }                
            );
        }
    });
}

// LOAD competitions
function loadCompetitions(){
    var Event = require('./app/models/event');
    var League = require('./app/models/league');
    var Competition = require('./app/models/competition');
    var User = require('./app/models/user');

    User.findOne({'local.email': "darcy@araitanga.com"}, function (err, user) {
        if (err) console.log("ERROR:"+err.toString());
        else{
            
            User.findOne({'local.email': "leslie@araitanga.com"}, function (err, user2) {
                if (err) console.log("ERROR:"+err.toString());
                else{
            
                    League.findOne({'name': "A-League"}, function (err, league) {
                        if (err) console.log("ERROR:"+err.toString());
                        else{
                            
                            Event.findOne({'name': "2014/15 Season"}, function (err, event) {
                                if (err) console.log("ERROR:"+err.toString());
                                else{
                            
                                    Competition.create({
                                        name: 'Roseneath School',
                                        usersAccepted: [user._id, user2.id],
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
    Team.update({name: 'Adelaide United'},{$set: {shtname:'Reds', shtcode:'ADU',league:'53fc6247b918a6b661d423b1'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'Brisbane Roar'},{$set: {shtname:'Roar', shtcode:'BBR',league:'53fc6247b918a6b661d423b1'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'Central Coast Mariners'},{$set: {shtname:'', shtcode:'CCM',league:'53fc6247b918a6b661d423b1'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'Melbourne City'},{$set: {shtname:'City', shtcode:'MCY',league:'53fc6247b918a6b661d423b1'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'Melbourne Victory'},{$set: {shtname:'Victory', shtcode:'MBV',league:'53fc6247b918a6b661d423b1'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'Newcastle Jets'},{$set: {shtname:'Jets', shtcode:'NUJ',league:'53fc6247b918a6b661d423b1'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'Perth Glory'},{$set: {shtname:'Glory', shtcode:'PTH',league:'53fc6247b918a6b661d423b1'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'Sydney FC'},{$set: {shtname:'Sky Blues', shtcode:'SFC',league:'53fc6247b918a6b661d423b1'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'Wellington Phoenix'},{$set: {shtname:'Phoenix', shtcode:'WPX',league:'53fc6247b918a6b661d423b1'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'Western Sydney Wanderers'},{$set: {shtname:'Wanderers', shtcode:'WSW',league:'53fc6247b918a6b661d423b1'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'Draw'},{$set: {shtname:'-', shtcode:'DRW'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'To Be Confirmed'},{$set: {shtname:'-', shtcode:'TBC',league:'53fc6247b918a6b661d423b1'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
}

//UPDATE rounds
function updateRounds(leagueName, eventName){
    var League = require('../models/league');
    var Event = require('../models/event');
    var Round = require('../models/round');
    console.log('updating rounds');
    var roundList = [
        {name:'Round 1',
        roundPosition:1 ,
        firstFixture: "2014-10-10 19:40",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2014-10-12 17:00",
        numberOffixtures: 5
        },
        {name:'Round 2',
        roundPosition:2 ,
        firstFixture: "2014-10-17 19:40",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2014-10-19 17:00",
        numberOffixtures: 5
        },
        {name:'Round 3',
        roundPosition: 3,
        firstFixture: "2014-10-24 20:00",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2014-10-26 17:00",
        numberOffixtures: 5
        },
        {name:'Round 4',
        roundPosition: 4,
        firstFixture: "2014-10-31 19:30",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2014-11-03 19:30",
        numberOffixtures: 5
        },
        {name:'Round 5',
        roundPosition: 5,
        firstFixture: "2014-11-07 19:30",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2014-11-09 17:00",
        numberOffixtures: 5
        },
        {name:'Round 6',
        roundPosition: 6,
        firstFixture: "2014-11-14 19:40",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2014-11-16 17:00",
        numberOffixtures: 5
        },
        {name:'Round 7',
        roundPosition: 7,
        firstFixture: "2014-11-21 19:30",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2014-11-23 17:00",
        numberOffixtures: 5
        },
        {name:'Round 8',
        roundPosition: 8,
        firstFixture: "2014-11-28 19:40",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2014-11-30 17:00",
        numberOffixtures: 5
        },
        {name:'Round 9',
        roundPosition: 9,
        firstFixture: "2014-12-03 19:30",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2014-12-07 17:00",
        numberOffixtures: 5
        },
        {name:'Round 10',
        roundPosition: 10,
        firstFixture: "2014-12-12 19:30",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2015-03-11 19:30",
        numberOffixtures: 5
        },
        {name:'Round 11',
        roundPosition: 11,
        firstFixture: "2014-12-19 19:30",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2015-03-25 20:00",
        numberOffixtures: 5
        },
        {name:'Round 12',
        roundPosition: 12,
        firstFixture: "2014-12-26 17:00",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2014-12-28 17:00",
        numberOffixtures: 5
        },
        {name:'Round 13',
        roundPosition: 13,
        firstFixture: "2014-12-30 17:00",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2015-01-02 19:40",
        numberOffixtures: 5
        },
        {name:'Round 14',
        roundPosition: 14,
        firstFixture: "2015-01-03 19:30",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2015-01-06 19:30",
        numberOffixtures: 5
        },
        {name:'Round 15',
        roundPosition: 15,
        firstFixture: "2015-01-24 17:00",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2015-02-02 20:00",
        numberOffixtures: 5
        },
        {name:'Round 16',
        roundPosition: 16,
        firstFixture: "2015-02-06 19:40",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2015-02-08 17:00",
        numberOffixtures: 5
        },

        {name:'Round 17',
        roundPosition: 17,
        firstFixture: "2015-02-13 19:30",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2015-02-15 17:00",
        numberOffixtures: 5
        },
        {name:'Round 18',
        roundPosition: 18,
        firstFixture: "2015-02-20 19:40",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2015-02-22 17:00",
        numberOffixtures: 5
        },
        {name:'Round 19',
        roundPosition: 19,
        firstFixture: "2015-02-27 19:40",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2015-03-01 17:00",
        numberOffixtures: 5
        },
        {name:'Round 20',
        roundPosition: 20,
        firstFixture: "2015-03-06 19:30",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2015-03-08 17:00",
        numberOffixtures: 5
        },
        {name:'Round 21',
        roundPosition: 21,
        firstFixture: "2015-03-12 19:30",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2015-03-15 17:00",
        numberOffixtures: 5
        },
        {name:'Round 22',
        roundPosition: 22,
        firstFixture: "2015-03-20 19:30",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2015-03-22 17:00",
        numberOffixtures: 5
        },
        {name:'Round 23',
        roundPosition: 23,
        firstFixture: "2015-03-27 19:30",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2015-03-29 17:00",
        numberOffixtures: 5
        },
        {name:'Round 24',
        roundPosition: 24,
        firstFixture: "2015-04-02 20:00",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2015-04-06 17:00",
        numberOffixtures: 5
        },
        {name:'Round 25',
        roundPosition: 25,
        firstFixture: "2015-04-10 19:30",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2015-04-12 17:00",
        numberOffixtures: 5
        },
        {name:'Round 26',
        roundPosition: 26,
        firstFixture: "2015-04-17 19:30",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2015-04-19 17:00",
        numberOffixtures: 5
        },
        {name:'Round 27',
        roundPosition: 27,
        firstFixture: "2015-04-24 19:40",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2015-04-26 17:00",
        numberOffixtures: 5
        },
        {name:'Elimination Finals',
        roundPosition: 28,
        firstFixture: "2015-05-01 19:40",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2015-05-03 17:00",
        numberOffixtures: 2
        },
        {name:'Semi Finals',
        roundPosition: 29,
        firstFixture: "2015-05-08 19:30",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2015-05-10 17:00",
        numberOffixtures: 2
        },
        {name:'Grand Final',
        roundPosition: 30,
        firstFixture: "2015-05-17 16:00",
        ffTimeZone: "Australia/Brisbane",
        lastFixtureDate: "2015-05-17 16:00",
        numberOffixtures: 1
      },

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
                            {$set: {type:'fixture', roundPosition: roundData.roundPosition,
                              closeDate:(convertTime(roundData.firstFixture, roundData.ffTimeZone,"UTC")), 
                              lastFixtureDate:(convertTime(roundData.lastFixtureDate, roundData.ffTimeZone,"UTC")),
                              numberOfFixtures: roundData.numberOffixtures }},
                            {upsert: false},
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



function updateFixtures(leagueName, eventName){
    var League = require('../models/league');
    var Event = require('../models/event');
    var Round = require('../models/round');
    var Team = require('../models/team');
    var Fixture = require('../models/fixture');

    var fixtureList = [

        // *** ROUND 3 ***
        {type: 'match', homeSht:'TBC',awaySht:'BBR', roundName: 'Round 3',date: convertTime("2013-10-25 19:30", "Australia/Brisbane","UTC")},
        {type: 'match', homeSht:'CCM',awaySht:'ADU', roundName: 'Round 3',date: convertTime("2013-10-26 17:30", "Australia/Brisbane","UTC")},
        {type: 'match', homeSht:'SFC',awaySht:'WSW', roundName: 'Round 3',date: convertTime("2013-10-26 19:45", "Australia/Brisbane","UTC")},
        {type: 'match', homeSht:'WPX',awaySht:'NUJ', roundName: 'Round 3',date: convertTime("2013-10-27 17:00", "Pacific/Auckland","UTC")},
        {type: 'match', homeSht:'PTH',awaySht:'MCY', roundName: 'Round 3',date: convertTime("2013-10-27 14:00", "Australia/Perth","UTC")},
        
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
                                                Team.findOne({shtcode:'DRW'}, function(err, draw){
                                                    if (err) console.log("awayTeamERROR:"+err.toString());
                                                    else {

                                                            //load a new set of rounds
                                                            Team.findOne({shtcode:fixtureData.winner}, function(err, winner){
                                                                if(err){console.log(err)}
                                                                else{
                                                                Fixture.update({homeTeam: homeTeam, awayTeam: awayTeam, closeDate: fixtureData.date,date: fixtureData.date, event: event._id, league: league._id},
                                                                {$set:{round: round._id}},
                                                                    {upsert: true}, function(err) {if (err) console.log("Fixture update Error:"+err.toString())}
                                                                    );
                                                                }
                                                            });

          
/**
                                                            // load the results for the round
                                                            var winner;
                                                            var scoreDifference;
                                                            var homeTeamLeaguePoints=0;
                                                            var awayTeamLeaguePoints=0;
                                                            if (fixtureData.homeScore == fixtureData.awayScore){winner = draw;scoreDifference = 0;homeTeamLeaguePoints =1;awayTeamLeaguePoints = 1;}
                                                            else {
                                                                scoreDifference = Math.abs(fixtureData.homeScore-fixtureData.awayScore);
                                                                if(fixtureData.homeScore>fixtureData.awayScore){winner = homeTeam;homeTeamLeaguePoints=3;}
                                                                else{winner = awayTeam;awayTeamLeaguePoints=3;}
                                                            }

                                                            Fixture.update({homeTeam: homeTeam, awayTeam: awayTeam, closeDate: fixtureData.date, event: event._id, league: league._id,round: round._id},
                                                            {$set:{homeScore: fixtureData.homeScore, awayScore:fixtureData.awayScore, scoreDifference: scoreDifference,winner: winner,
                                                                homeTeamLeaguePoints: homeTeamLeaguePoints, awayTeamLeaguePoints: awayTeamLeaguePoints}},
                                                                {upsert: true}, function(err) {if (err) console.log("Fixture update Error:"+err.toString())}
                                                                );
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
    
    var resultsList = [
        
        {   fixtureid:'549f0a61f1ace29007e4c029', homeScore:2,   awayScore:1  }, //ADU CCM
        {    fixtureid:'549f0a61f1ace29007e4c028', homeScore:0,   awayScore:3  }, //WSW MBV
        {    fixtureid:'549f0a61f1ace29007e4c026', homeScore:5,   awayScore:4  }, // SFC BBR
        {    fixtureid:'549f0a61f1ace29007e4c022', homeScore:1,   awayScore:2  }, // PTH PHX
        {    fixtureid:'549f0a61f1ace29007e4c027', homeScore:4,   awayScore:0  }, // MCY NUJ
        ];
        
        var aLeagueDrawTeamId = '53fc6399b918a6b661d423b8';

        resultsList.forEach(function(result){
           Fixture.findById(result.fixtureid).exec(function(err,fixture){
               if(err){console.log('ERROR:%s',err)}
               else{
                   fixture.homeScore = result.homeScore;
                   fixture.awayScore = result.awayScore;


                   if (result.homeScore == result.awayScore){
                       fixture.winner = aLeagueDrawTeamId;
                       fixture.scoreDifference = 0;
                       fixture.homeTeamLeaguePoints =1;
                       fixture.awayTeamLeaguePoints = 1;
                   }
                    else {
                        fixture.scoreDifference = Math.abs(result.homeScore-result.awayScore);
                        if(result.homeScore>result.awayScore){
                            fixture.winner = fixture.homeTeam;
                            fixture.homeTeamLeaguePoints=3;
                        }
                        else{
                            fixture.winner = fixture.awayTeam;
                            fixture.awayTeamLeaguePoints=3;}
                    }

                   fixture.save();
                   console.log('fixture %s updated',fixture.id);
               }
           });
        });
}





function convertTime(time,inZone,outZone){
    var moment = require('moment-timezone');
    console.log("ORIGTIME: %s",time)
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

// connect to the database
var dbUrl = 'mongodb://'+process.env.DATABASE_USER+':'+process.env.DATABASE_PASSWORD+'@'+process.env.DATABASE_SERVER+':'+process.env.DATABASE_PORT+'/'+process.env.DATABASE_NAME;
mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback(){
    //updateLeagues();
    //updateEvent();
    //updateTeams();
    //updateRounds("A-League","2014/15 Season");
    updateFixtures("A-League","2013/14 Season");
    //updateUsers();
    //loadCompetitions();
    //updatePicks('leslie@araitanga.com', 'test Comp-leslieonly')
    //updateFixtureResult();

    console.log("done");
});