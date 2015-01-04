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
    var Event = require('./app/models/event');
    var League = require('./app/models/league');
    League.findOne({name:"A-League"}, function (err, league) {
        if (err) console.log("ERROR:"+err.toString());
        else {
            Event.update({name:'2014/15 Season'},
                {$set: {league: league._id}},
                {upsert:true},
                function (err){
                    if (err) console.log("Event update Error:"+err.toString());
                }                
            );
        }
    });
}

// update users
function updateUsers(){
    User.update({local:{email:'leslie@araitanga.com'}},
        {$set: {
            local:{email:'leslie@araitanga.com',password: 'test'}
        }},{upsert: true},
        function (err){
            if (err) console.log("user update Error:"+err.toString());
        }
    );

    User.update({local:{email:'darcy@araitanga.com'}},
        {$set: {
            local:{email:'darcy@araitanga.com',password: 'test'}
        }},{upsert: true},
        function (err){
            if (err) console.log("user update Error:"+err.toString());
        }
    );
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
    var Team = require('./app/models/team');    
    Team.update({name: 'Adelaide United'},{$set: {shtname:'Reds', shtcode:'ADU'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'Brisbane Roar'},{$set: {shtname:'Roar', shtcode:'BBR'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'Central Coast Mariners'},{$set: {shtname:'', shtcode:'CCM'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'Melbourne City'},{$set: {shtname:'City', shtcode:'MCY'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'Melbourne Victory'},{$set: {shtname:'Victory', shtcode:'MBV'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'Newcastle Jets'},{$set: {shtname:'Jets', shtcode:'NUJ'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'Perth Glory'},{$set: {shtname:'Glory', shtcode:'PTH'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'Sydney FC'},{$set: {shtname:'Sky Blues', shtcode:'SFC'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'Wellington Phoenix'},{$set: {shtname:'Phoenix', shtcode:'WPX'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'Western Sydney Wanderers'},{$set: {shtname:'Wanderers', shtcode:'WSW'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'Draw'},{$set: {shtname:'-', shtcode:'DRW'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
    Team.update({name: 'To Be Confirmed'},{$set: {shtname:'-', shtcode:'TBC'}},{upsert:true}, function(err){if (err) console.log("Round update Error:"+err.toString())});
}

//UPDATE rounds
function updateRounds(leagueName, eventName){
    var League = require('./app/models/league');
    var Event = require('./app/models/event');
    var Round = require('./app/models/round');
    console.log('updating rounds');
    var roundList = [
        {name:'Round 1',
        roundPosition:1 ,
        firstFixture: "2014-10-10 19:40",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 2',
        roundPosition:2 ,
        firstFixture: "2014-10-17 19:40",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 3',
        roundPosition: 3,
        firstFixture: "2014-10-24 20:00",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 4',
        roundPosition: 4,
        firstFixture: "2014-10-31 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 5',
        roundPosition: 5,
        firstFixture: "2014-11-07 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 6',
        roundPosition: 6,
        firstFixture: "2014-11-14 19:40",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 7',
        roundPosition: 7,
        firstFixture: "2014-11-21 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 8',
        roundPosition: 8,
        firstFixture: "2014-11-28 19:40",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 9',
        roundPosition: 9,
        firstFixture: "2014-12-03 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 10',
        roundPosition: 10,
        firstFixture: "2014-12-12 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 11',
        roundPosition: 11,
        firstFixture: "2014-12-19 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 12',
        roundPosition: 12,
        firstFixture: "2014-12-26 17:00",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 13',
        roundPosition: 13,
        firstFixture: "2014-12-30 17:00",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 14',
        roundPosition: 14,
        firstFixture: "2015-01-03 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 15',
        roundPosition: 15,
        firstFixture: "2015-01-24 17:00",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 16',
        roundPosition: 16,
        firstFixture: "2015-02-06 19:40",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 17',
        roundPosition: 17,
        firstFixture: "2015-02-13 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 18',
        roundPosition: 18,
        firstFixture: "2015-02-20 19:40",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 19',
        roundPosition: 19,
        firstFixture: "2015-02-27 19:40",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 20',
        roundPosition: 20,
        firstFixture: "2015-03-06 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 21',
        roundPosition: 21,
        firstFixture: "2015-03-12 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 22',
        roundPosition: 22,
        firstFixture: "2015-03-20 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 23',
        roundPosition: 23,
        firstFixture: "2015-03-27 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 24',
        roundPosition: 24,
        firstFixture: "2015-04-02 20:00",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 25',
        roundPosition: 25,
        firstFixture: "2015-04-10 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 26',
        roundPosition: 26,
        firstFixture: "2015-04-17 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 27',
        roundPosition: 27,
        firstFixture: "2015-04-24 19:40",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Elimination Finals',
        roundPosition: 28,
        firstFixture: "2015-04-24 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Semi Finals',
        roundPosition: 29,
        firstFixture: "2015-05-01 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
  //      {name:'Grand Final',
//        roundPosition: 30,
 //       //firstFixture: "2014-10-10 19:30",
  //      //ffTimeZone: "Australia/Brisbane"
//        },
        {name:'Bonus Points',
        roundPosition: 31,
        firstFixture: "2014-10-10 19:30",
        ffTimeZone: "Australia/Brisbane"
        }
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
                            {$set: {roundPosition: roundData.roundPosition,closeDate:(convertTime(roundData.firstFixture, roundData.ffTimeZone,"UTC"))}},
                            //{$set: {roundPosition: roundData.roundPosition}},
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

// UPDATE fixtures
function updateFixtures(leagueName, eventName){
    var League = require('./app/models/league');
    var Event = require('./app/models/event');
    var Round = require('./app/models/round');
    var Team = require('./app/models/team');
    var Fixture = require('./app/models/fixture');

    var fixtureList = [
        
        // *** ROUND 1 ***
        {type: 'match',
         homeSht:'MBV',
         awaySht:'WSW',
         roundName: 'Round 1',
         date: convertTime("2014-10-10 19:30", "Australia/Brisbane","UTC")},
        {type: 'match',
         homeSht:'CCM',
         awaySht:'NUJ',
         roundName: 'Round 1',
         date: convertTime("2014-10-11 17:30", "Australia/Brisbane","UTC")},
        {type: 'match',
         homeSht:'SFC',
         awaySht:'MCY',
         roundName: 'Round 1',
         date: convertTime("2014-10-11 19:30", "Australia/Brisbane","UTC")},
        {type: 'match',
         homeSht:'WPX',
         awaySht:'PTH',
         roundName: 'Round 1',
         date: convertTime("2014-12-10 15:00", "Australia/Brisbane","UTC")},
        {type: 'match',
         homeSht:'BBR',
         awaySht:'ADU',
         roundName: 'Round 1',
         date: convertTime("2014-10-12 17:00", "Australia/Brisbane","UTC")},

    // *** ROUND 2 ***
        {type: 'match',
         homeSht:'ADU',
         awaySht:'MBV',
         roundName: 'Round 2',
         date: convertTime("2014-10-17 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'CCM',
         awaySht:'WPX',
         roundName: 'Round 2',
         date: convertTime("2014-10-18 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'SFC',
         awaySht:'WSW',
         roundName: 'Round 2',
         date: convertTime("2014-10-18 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MCY',
         awaySht:'NUJ',
         roundName: 'Round 2',
         date: convertTime("2014-10-19 15:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'PTH',
         awaySht:'BBR',
         roundName: 'Round 2',
         date: convertTime("2014-10-19 17:00", "Australia/Brisbane","UTC")},

    // *** ROUND 3 ***

        {type: 'match',
         homeSht:'BBR',
         awaySht:'SFC',
         roundName: 'Round 3',
         date: convertTime("2014-10-24 19:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WSW',
         awaySht:'CCM',
         roundName: 'Round 3',
         date: convertTime("2014-11-19", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MBV',
         awaySht:'MCY',
         roundName: 'Round 3',
         date: convertTime("2014-10-25 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WPX',
         awaySht:'NUJ',
         roundName: 'Round 3',
         date: convertTime("2014-10-26 15:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'ADU',
         awaySht:'PTH',
         roundName: 'Round 3',
         date: convertTime("2014-10-26 17:00", "Australia/Brisbane","UTC")}

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

                                                            Team.findOne({shtcode:fixtureData.winner}, function(err, winner){
                                                                Fixture.update({homeTeam: homeTeam, awayTeam: awayTeam, closeDate: fixtureData.date, event: event._id, league: league._id},
                                                                {$set:{round: round._id}},
                                                                    {upsert: true}, function(err) {if (err) console.log("Fixture update Error:"+err.toString())}
                                                                    );
/**
                                                                Fixture.update({homeTeam: homeTeam, awayTeam: awayTeam, date: fixtureData.date, event: event._id, league: league._id},
                                                                {$set:{homeScore: fixtureData.homeScore, awayScore:fixtureData.awayScore, scoreDifference: fixtureData.scoreDifference,winner: winner,
                                                                    homeTeamLeaguePoints: fixtureData.homeTeamLeaguePoints, awayTeamLeaguePoints: fixtureData.awayTeamLeaguePoints, round: round._id}},
                                                                    {upsert: true}, function(err) {if (err) console.log("Fixture update Error:"+err.toString())}
                                                                    );
**/

                                                            });
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

function updateFixtureResults(leagueName, eventName){
    var League = require('./app/models/league');
    var Event = require('./app/models/event');
    var Round = require('./app/models/round');
    var Team = require('./app/models/team');
    var Fixture = require('./app/models/fixture');

    var fixtureList = [

/**        
        // *** ROUND 1 ***
        {type: 'match',
         homeSht:'MBV',
         awaySht:'WSW',
         roundName: 'Round 1',
         homeScore: 4,
         awayScore: 1,
         scoreDifference: 3,
         winner: 'MBV',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         date: convertTime("2014-10-10 19:30", "Australia/Brisbane","UTC")},
        {type: 'match',
         homeSht:'CCM',
         awaySht:'NUJ',
         homeScore: 1,
         awayScore: 0,
         scoreDifference: 1,
         winner: 'CCM',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 1',
         date: convertTime("2014-10-11 17:30", "Australia/Brisbane","UTC")},
        {type: 'match',
         homeSht:'SFC',
         awaySht:'MCY',
         homeScore: 1,
         awayScore: 1,
         scoreDifference: 0,
         winner: 'DRW',
         homeTeamLeaguePoints: 1,
         awayTeamLeaguePoints: 1,
         roundName: 'Round 1',
         date: convertTime("2014-10-11 19:30", "Australia/Brisbane","UTC")},

      
        {type: 'match',
         homeSht:'WPX',
         awaySht:'PTH',
         homeScore: 1,
         awayScore: 2,
         scoreDifference: 1,
         winner: 'PTH',
         homeTeamLeaguePoints: 0,
         awayTeamLeaguePoints: 3,
         roundName: 'Round 1',
         date: convertTime("2014-10-12 15:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'BBR',
         awaySht:'ADU',
         homeScore: 1,
         awayScore: 2,
         scoreDifference: 1,
         winner: 'ADU',
         homeTeamLeaguePoints: 0,
         awayTeamLeaguePoints: 3,
         roundName: 'Round 1',
         date: convertTime("2014-10-12 17:00", "Australia/Brisbane","UTC")},

    // *** ROUND 2 ***
        {type: 'match',
         homeSht:'ADU',
         awaySht:'MBV',
         roundName: 'Round 2',
         homeScore: 1,
         awayScore: 1,
         scoreDifference: 0,
         winner: 'DRW',
         homeTeamLeaguePoints: 1,
         awayTeamLeaguePoints: 1,
         date: convertTime("2014-10-17 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'CCM',
         awaySht:'WPX',
         roundName: 'Round 2',
         homeScore: 1,
         awayScore: 2,
         scoreDifference: 1,
         winner: 'WPX',
         homeTeamLeaguePoints: 0,
         awayTeamLeaguePoints: 3,
         date: convertTime("2014-10-18 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'SFC',
         awaySht:'WSW',
         homeScore: 3,
         awayScore: 2,
         scoreDifference: 1,
         winner: 'SFC',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 2',
         date: convertTime("2014-10-18 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MCY',
         awaySht:'NUJ',
         homeScore: 1,
         awayScore: 1,
         scoreDifference: 0,
         winner: 'DRW',
         homeTeamLeaguePoints: 1,
         awayTeamLeaguePoints: 1,
         roundName: 'Round 2',
         date: convertTime("2014-10-19 15:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'PTH',
         awaySht:'BBR',
         homeScore: 3,
         awayScore: 2,
         scoreDifference: 1,
         winner: 'DRW',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 2',
         date: convertTime("2014-10-19 17:00", "Australia/Brisbane","UTC")}

    // *** ROUND 3 ***

        {type: 'match',
         homeSht:'BBR',
         awaySht:'SFC',
         homeScore: 0,
         awayScore: 2,
         scoreDifference: 2,
         winner: 'SFC',
         homeTeamLeaguePoints: 0,
         awayTeamLeaguePoints: 3,
         roundName: 'Round 3',
         date: convertTime("2014-10-24 19:00", "Australia/Brisbane","UTC")},

//        {type: 'match',
//         homeSht:'WSW',
//         awaySht:'CCM',
//         homeScore: ,
//         awayScore: ,
//         scoreDifference: ,
//         winner: '',
//         homeTeamLeaguePoints: ,
//         awayTeamLeaguePoints: ,
//         roundName: 'Round 3',
//         date: convertTime("2014-11-19", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MBV',
         awaySht:'MCY',
         homeScore: 5,
         awayScore: 2,
         scoreDifference: 3,
         winner: 'MBV',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 3',
         date: convertTime("2014-10-25 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WPX',
         awaySht:'NUJ',
         homeScore: 4,
         awayScore: 1,
         scoreDifference: 3,
         winner: 'WPX',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 3',
         date: convertTime("2014-10-26 15:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'ADU',
         awaySht:'PTH',
         homeScore: 2,
         awayScore: 0,
         scoreDifference: 2,
         winner: 'ADU',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 3',
         date: convertTime("2014-10-26 17:00", "Australia/Brisbane","UTC")}
**/

    // *** ROUND 4 ***


        {type: 'match',
         homeSht:'MCY',
         awaySht:'ADU',
         homeScore: 1,
         awayScore: 2,
         scoreDifference: 1,
         winner: 'ADU',
         homeTeamLeaguePoints: 0,
         awayTeamLeaguePoints: 3,
         roundName: 'Round 4',
         date: convertTime("2014-10-31 19:40", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'PTH',
         awaySht:'NUJ',
         homeScore: 2,
         awayScore: 1,
         scoreDifference: 1,
         winner: 'PTH',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 4',
         date: convertTime("2014-11-01 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'SFC',
         awaySht:'CCM',
         homeScore: 2,
         awayScore: 0,
         scoreDifference: 2,
         winner: 'SFC',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 4',
         date: convertTime("2014-11-02 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MBV',
         awaySht:'WPX',
         homeScore: 2,
         awayScore: 0,
         scoreDifference: 2,
         winner: 'MBV',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 4',
         date: convertTime("2014-11-03 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WSW',
         awaySht:'BBR',
         homeScore:0 ,
         awayScore:1 ,
         scoreDifference:1 ,
         winner: 'BBR',
         homeTeamLeaguePoints:0 ,
         awayTeamLeaguePoints:3 ,
         roundName: 'Round 4',
         date: convertTime("2014-12-03 19:30", "Australia/Brisbane","UTC")},
/**
    //ROUND 5
        {type: 'match',
         homeSht:'WPX',
         awaySht:'WSW',
         homeScore: 1,
         awayScore: 0,
         scoreDifference: 1,
         winner: 'WPX',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 5',
         date: convertTime("2014-11-07 17:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'ADU',
         awaySht:'SFC',
         homeScore: 0,
         awayScore: 0,
         scoreDifference: 0,
         winner: 'DRW',
         homeTeamLeaguePoints: 1,
         awayTeamLeaguePoints: 1,
         roundName: 'Round 5',
         date: convertTime("2014-11-07 19:45", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'NUJ',
         awaySht:'MBV',
         homeScore: 2,
         awayScore: 2,
         scoreDifference: 0,
         winner: 'DRW',
         homeTeamLeaguePoints: 1,
         awayTeamLeaguePoints: 1,
         roundName: 'Round 5',
         date: convertTime("2014-11-08 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'BBR',
         awaySht:'MCY',
         homeScore: 1,
         awayScore: 3,
         scoreDifference: 2,
         winner: 'MCY',
         homeTeamLeaguePoints: 0,
         awayTeamLeaguePoints: 3,
         roundName: 'Round 5',
         date: convertTime("2014-11-08 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'CCM',
         awaySht:'PTH',
         homeScore: 0,
         awayScore: 1,
         scoreDifference:1 ,
         winner: 'PTH',
         homeTeamLeaguePoints: 0,
         awayTeamLeaguePoints: 3,
         roundName: 'Round 5',
         date: convertTime("2014-11-09 17:00", "Australia/Brisbane","UTC")},

    //ROUND 6
        {type: 'match',
         homeSht:'NUJ',
         awaySht:'BBR',
         homeScore: 0,
         awayScore: 4,
         scoreDifference: 4,
         winner: 'BBR',
         homeTeamLeaguePoints: 0,
         awayTeamLeaguePoints: 3,
         roundName: 'Round 6',
         date: convertTime("2014-11-14 19:40", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'ADU',
         awaySht:'WPX',
         homeScore: 2,
         awayScore: 1,
         scoreDifference: 1,
         winner: 'ADU',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 6',
         date: convertTime("2014-11-15 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'SFC',
         awaySht:'MBV',
         homeScore: 0,
         awayScore: 0,
         scoreDifference: 0,
         winner: 'DRW',
         homeTeamLeaguePoints: 1,
         awayTeamLeaguePoints: 1,
         roundName: 'Round 6',
         date: convertTime("2014-11-15 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'PTH',
         awaySht:'WSW',
         homeScore: 2,
         awayScore: 1,
         scoreDifference: 1,
         winner: 'PTH',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 6',
         date: convertTime("2014-11-15 21:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MCY',
         awaySht:'CCM',
         homeScore: 2,
         awayScore:2 ,
         scoreDifference:0 ,
         winner: 'DRW',
         homeTeamLeaguePoints:1 ,
         awayTeamLeaguePoints:1 ,
         roundName: 'Round 6',
         date: convertTime("2014-11-16 17:00", "Australia/Brisbane","UTC")}


        {type: 'match',
         homeSht:'MBV',
         awaySht:'BBR',
         homeScore: 1,
         awayScore: 0,
         scoreDifference: 1,
         winner: 'MBV',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 7',
         date: convertTime("2014-11-21 19:40", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'PTH',
         awaySht:'WPX',
         homeScore: 2,
         awayScore: 1,
         scoreDifference: 1,
         winner: 'PTH',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 7',
         date: convertTime("2014-11-21 21:45", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WSW',
         awaySht:'NUJ',
         homeScore: 1,
         awayScore: 1,
         scoreDifference: 0,
         winner: 'DRW',
         homeTeamLeaguePoints: 1,
         awayTeamLeaguePoints: 1,
         roundName: 'Round 7',
         date: convertTime("2014-11-22 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MCY',
         awaySht:'SFC',
         homeScore: 1,
         awayScore: 2,
         scoreDifference: 1,
         winner: 'SFC',
         homeTeamLeaguePoints: 0,
         awayTeamLeaguePoints: 3,
         roundName: 'Round 7',
         date: convertTime("2014-11-22 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'CCM',
         awaySht:'ADU',
         homeScore: 0,
         awayScore: 2,
         scoreDifference: 2,
         winner: 'ADU',
         homeTeamLeaguePoints: 0,
         awayTeamLeaguePoints: 3,
         roundName: 'Round 7',
         date: convertTime("2014-11-23 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MBV',
         awaySht:'ADU',
         homeScore: 3,
         awayScore: 2,
         scoreDifference: 1,
         winner: 'MBV',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 8',
         date: convertTime("2014-11-28 19:40", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'BBR',
         awaySht:'PTH',
         homeScore: 1,
         awayScore: 1,
         scoreDifference: 0,
         winner: 'DRW',
         homeTeamLeaguePoints: 1,
         awayTeamLeaguePoints: 1,
         roundName: 'Round 8',
         date: convertTime("2014-11-29 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WSW',
         awaySht:'SFC',
         homeScore: 1,
         awayScore: 1,
         scoreDifference:0 ,
         winner: 'DRW',
         homeTeamLeaguePoints:1 ,
         awayTeamLeaguePoints:1 ,
         roundName: 'Round 8',
         date: convertTime("2014-11-29 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WPX',
         awaySht:'MCY',
         homeScore: 5,
         awayScore: 1,
         scoreDifference: 4,
         winner: 'WPX',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 8',
         date: convertTime("2014-11-30 15:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'NUJ',
         awaySht:'CCM',
         homeScore: 1,
         awayScore: 1,
         scoreDifference: 0,
         winner: 'DRW',
         homeTeamLeaguePoints: 1,
         awayTeamLeaguePoints: 1,
         roundName: 'Round 8',
         date: convertTime("2014-11-30 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WSW',
         awaySht:'BBR',
         homeScore: ,
         awayScore: ,
         scoreDifference: ,
         winner: '',
         homeTeamLeaguePoints: ,
         awayTeamLeaguePoints: ,
         roundName: 'Round 9',
         date: convertTime("2014-12-03 19:30", "Australia/Brisbane","UTC")},


        {type: 'match',
         homeSht:'SFC',
         awaySht:'PTH',
         homeScore: 1,
         awayScore: 2,
         scoreDifference: 1,
         winner: 'PTH',
         homeTeamLeaguePoints: 0,
         awayTeamLeaguePoints: 3,
         roundName: 'Round 9',
         date: convertTime("2014-12-04 19:45", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'CCM',
         awaySht:'MBV',
         homeScore: 0,
         awayScore: 3,
         scoreDifference: 3,
         winner: 'MBV',
         homeTeamLeaguePoints: 0,
         awayTeamLeaguePoints: 3,
         roundName: 'Round 9',
         date: convertTime("2014-12-05 15:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'NUJ',
         awaySht:'WPX',
         homeScore: 1,
         awayScore: 3,
         scoreDifference: 2,
         winner: 'WPX',
         homeTeamLeaguePoints:0 ,
         awayTeamLeaguePoints: 3,
         roundName: 'Round 9',
         date: convertTime("2014-12-06 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'ADU',
         awaySht:'WSW',
         homeScore: 2,
         awayScore: 0,
         scoreDifference: 2,
         winner: 'ADU',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 9',
         date: convertTime("2014-12-06 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MCY',
         awaySht:'BBR',
         homeScore: 1,
         awayScore: 0,
         scoreDifference: 1,
         winner: 'MCY',
         homeTeamLeaguePoints:3 ,
         awayTeamLeaguePoints:0 ,
         roundName: 'Round 9',
         date: convertTime("2014-12-07 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'ADU',
         awaySht:'BBR',
         homeScore: 0,
         awayScore: 1,
         scoreDifference: 1,
         winner: 'ADU',
         homeTeamLeaguePoints: 0,
         awayTeamLeaguePoints: 3,
         roundName: 'Round 10',
         date: convertTime("2014-12-12 19:40", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'PTH',
         awaySht:'NUJ',
         homeScore: 2,
         awayScore: 0,
         scoreDifference: 2,
         winner: 'PTH',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 10',
         date: convertTime("2014-12-12 21:45", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WPX',
         awaySht:'CCM',
         homeScore: 1,
         awayScore: 1,
         scoreDifference: 0,
         winner: 'DRW',
         homeTeamLeaguePoints:1 ,
         awayTeamLeaguePoints:1 ,
         roundName: 'Round 10',
         date: convertTime("2014-12-13 15:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WSW',
         awaySht:'MCY',
         homeScore: ,
         awayScore: ,
         scoreDifference: ,
         winner: '',
         homeTeamLeaguePoints: ,
         awayTeamLeaguePoints: ,
         roundName: 'Round 10',
         date: convertTime("2015-03-11 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MBV',
         awaySht:'SFC',
         homeScore:3 ,
         awayScore:3 ,
         scoreDifference:0 ,
         winner: 'DRW',
         homeTeamLeaguePoints: 1,
         awayTeamLeaguePoints: 1,
         roundName: 'Round 10',
         date: convertTime("2014-12-13 19:30", "Australia/Brisbane","UTC")}
**/
/**

        {type: 'match',
         homeSht:'NUJ',
         awaySht:'ADU',
         homeScore: 2,
         awayScore: 1,
         scoreDifference: 1,
         winner: 'NUJ',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 11',
         date: convertTime("2014-12-19 19:40", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MBV',
         awaySht:'MCY',
         homeScore: 1,
         awayScore: 0,
         scoreDifference: 1,
         winner: 'MBV',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 11',
         date: convertTime("2014-12-20 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'PTH',
         awaySht:'CCM',
         homeScore: 4,
         awayScore: 1,
         scoreDifference: 3,
         winner: 'PTH',
         homeTeamLeaguePoints:3 ,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 11',
         date: convertTime("2014-12-20 21:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'SFC',
         awaySht:'WPX',
         homeScore: 0,
         awayScore: 2,
         scoreDifference:2 ,
         winner: 'WPX',
         homeTeamLeaguePoints:0 ,
         awayTeamLeaguePoints: 3,
         roundName: 'Round 11',
         date: convertTime("2014-12-21 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'BBR',
         awaySht:'WSW',
         homeScore: ,
         awayScore: ,
         scoreDifference: ,
         winner: '',
         homeTeamLeaguePoints: ,
         awayTeamLeaguePoints: ,
         roundName: 'Round 11',
         date: convertTime("2014-03-25 20:00", "Australia/Brisbane","UTC")},



        {type: 'match',
         homeSht:'MCY',
         awaySht:'PTH',
         homeScore: 1,
         awayScore: 1,
         scoreDifference: 0,
         winner: 'DRW',
         homeTeamLeaguePoints: 1,
         awayTeamLeaguePoints: 1,
         roundName: 'Round 12',
         date: convertTime("2014-12-26 17:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'SFC',
         awaySht:'ADU',
         homeScore: 0,
         awayScore: 3,
         scoreDifference:3 ,
         winner: 'ADU',
         homeTeamLeaguePoints: 0,
         awayTeamLeaguePoints: 3,
         roundName: 'Round 12',
         date: convertTime("2014-12-26 19:45", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'CCM',
         awaySht:'BBR',
         homeScore: 3,
         awayScore: 3,
         scoreDifference: 0,
         winner: 'DRW',
         homeTeamLeaguePoints: 1,
         awayTeamLeaguePoints: 1,
         roundName: 'Round 12',
         date: convertTime("2014-12-27 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MBV',
         awaySht:'NUJ',
         homeScore: 1,
         awayScore: 0,
         scoreDifference:1 ,
         winner: 'MBV',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 12',
         date: convertTime("2014-12-27 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WPX',
         awaySht:'WSW',
         homeScore: 1,
         awayScore: 0,
         scoreDifference: 1,
         winner: 'WPX',
         homeTeamLeaguePoints: 3,
         awayTeamLeaguePoints: 0,
         roundName: 'Round 12',
         date: convertTime("2014-12-28 17:00", "Australia/Brisbane","UTC")},
**/

        {type: 'match',
         homeSht:'NUJ',
         awaySht:'MCY',
         roundName: 'Round 13',
         homeScore: 2,
         awayScore: 5,
         scoreDifference: 3,
         winner: 'MCY',
         homeTeamLeaguePoints: 0,
         awayTeamLeaguePoints: 3,
         date: convertTime("2014-12-30 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'BBR',
         awaySht:'SFC',
         homeScore: 0,
         awayScore: 0,
         scoreDifference: 0,
         winner: 'DRW',
         homeTeamLeaguePoints:1 ,
         awayTeamLeaguePoints:1 ,
         roundName: 'Round 13',
         date: convertTime("2014-12-30 20:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'ADU',
         awaySht:'WPX',
         homeScore: 1,
         awayScore: 3,
         scoreDifference: 2,
         winner: 'WPX',
         homeTeamLeaguePoints: 0,
         awayTeamLeaguePoints: 3,
         roundName: 'Round 13',
         date: convertTime("2014-12-31 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WSW',
         awaySht:'CCM',
         homeScore: 0,
         awayScore: 0,
         scoreDifference: 0,
         winner: 'DRW',
         homeTeamLeaguePoints: 1,
         awayTeamLeaguePoints: 1,
         roundName: 'Round 13',
         date: convertTime("2015-01-01 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MBV',
         awaySht:'PTH',
         homeScore: 1,
         awayScore: 2,
         scoreDifference: 1,
         winner: 'PTH',
         homeTeamLeaguePoints: 0,
         awayTeamLeaguePoints: 3,
         roundName: 'Round 13',
         date: convertTime("2015-01-02 19:40", "Australia/Brisbane","UTC")},

/**

        {type: 'match',
         homeSht:'SFC',
         awaySht:'NUJ',
         roundName: 'Round 14',
         date: convertTime("2015-01-03 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WPX',
         awaySht:'BBR',
         roundName: 'Round 14',
         date: convertTime("2015-01-04 15:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'CCM',
         awaySht:'MCY',
         roundName: 'Round 14',
         date: convertTime("2015-01-04 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'PTH',
         awaySht:'ADU',
         roundName: 'Round 14',
         date: convertTime("2015-01-05 20:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WSW',
         awaySht:'MBV',
         roundName: 'Round 14',
         date: convertTime("2015-01-06 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'ADU',
         awaySht:'NUJ',
         roundName: 'Round 15',
         date: convertTime("2015-01-24 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'CCM',
         awaySht:'SFC',
         roundName: 'Round 15',
         date: convertTime("2015-01-24 19:30", "Australia/Brisbane","UTC")},


        {type: 'match',
         homeSht:'PTH',
         awaySht:'MBV',
         roundName: 'Round 15',
         date: convertTime("2015-01-25 20:00", "Australia/Brisbane","UTC")},


        {type: 'match',
         homeSht:'MCY',
         awaySht:'WSW',
         roundName: 'Round 15',
         date: convertTime("2015-02-01 17:00", "Australia/Brisbane","UTC")},


        {type: 'match',
         homeSht:'BBR',
         awaySht:'WPX',
         roundName: 'Round 15',
         date: convertTime("2015-02-02 20:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'NUJ',
         awaySht:'BBR',
         roundName: 'Round 16',
         date: convertTime("2015-02-06 19:40", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'CCM',
         awaySht:'ADU',
         roundName: 'Round 16',
         date: convertTime("2015-02-07 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MBV',
         awaySht:'MCY',
         roundName: 'Round 16',
         date: convertTime("2015-02-07 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'PTH',
         awaySht:'SFC',
         roundName: 'Round 16',
         date: convertTime("2015-02-07 21:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WSW',
         awaySht:'WPX',
         roundName: 'Round 16',
         date: convertTime("2015-02-08 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'CCM',
         awaySht:'BBR',
         roundName: 'Round 17',
         date: convertTime("2015-02-13 19:40", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WPX',
         awaySht:'MCY',
         roundName: 'Round 17',
         date: convertTime("2015-02-14 15:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'NUJ',
         awaySht:'WSW',
         roundName: 'Round 17',
         date: convertTime("2015-02-14 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'SFC',
         awaySht:'MBV',
         roundName: 'Round 17',
         date: convertTime("2015-02-14 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'ADU',
         awaySht:'PTH',
         roundName: 'Round 17',
         date: convertTime("2015-02-15 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'BBR',
         awaySht:'MBV',
         roundName: 'Round 18',
         date: convertTime("2015-02-20 20:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'SFC',
         awaySht:'CCM',
         roundName: 'Round 18',
         date: convertTime("2015-02-21 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'ADU',
         awaySht:'WSW',
         roundName: 'Round 18',
         date: convertTime("2015-02-21 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WPX',
         awaySht:'NUJ',
         roundName: 'Round 18',
         date: convertTime("2015-02-22 15:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MCY',
         awaySht:'PTH',
         roundName: 'Round 18',
         date: convertTime("2015-02-22 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MCY',
         awaySht:'ADU',
         roundName: 'Round 19',
         date: convertTime("2015-02-27 19:40", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'NUJ',
         awaySht:'CCM',
         roundName: 'Round 19',
         date: convertTime("2015-02-28 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WSW',
         awaySht:'SFC',
         roundName: 'Round 19',
         date: convertTime("2015-02-28 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'PTH',
         awaySht:'BBR',
         roundName: 'Round 19',
         date: convertTime("2015-02-28 21:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MBV',
         awaySht:'WPX',
         roundName: 'Round 19',
         date: convertTime("2015-03-01 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'NUJ',
         awaySht:'SFC',
         roundName: 'Round 20',
         date: convertTime("2015-03-06 19:40", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WPX',
         awaySht:'ADU',
         roundName: 'Round 20',
         date: convertTime("2015-03-07 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MBV',
         awaySht:'PTH',
         roundName: 'Round 20',
         date: convertTime("2015-03-07 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'CCM',
         awaySht:'MCY',
         roundName: 'Round 20',
         date: convertTime("2015-03-08 15:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'BBR',
         awaySht:'WSW',
         roundName: 'Round 20',
         date: convertTime("2015-03-08 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'ADU',
         awaySht:'CCM',
         roundName: 'Round 21',
         date: convertTime("2015-03-12 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WSW',
         awaySht:'MBV',
         roundName: 'Round 21',
         date: convertTime("2015-03-13 19:40", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'SFC',
         awaySht:'BBR',
         roundName: 'Round 21',
         date: convertTime("2015-03-14 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'PTH',
         awaySht:'WPX',
         roundName: 'Round 21',
         date: convertTime("2015-03-14 21:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MCY',
         awaySht:'NUJ',
         roundName: 'Round 21',
         date: convertTime("2015-03-15 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'SFC',
         awaySht:'MCY',
         roundName: 'Round 22',
         date: convertTime("2015-03-20 19:40", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WSW',
         awaySht:'NUJ',
         roundName: 'Round 22',
         date: convertTime("2015-03-21 19:40", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'ADU',
         awaySht:'MBV',
         roundName: 'Round 22',
         date: convertTime("2015-03-21 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'CCM',
         awaySht:'PTH',
         roundName: 'Round 22',
         date: convertTime("2015-03-22 15:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'BBR',
         awaySht:'WPX',
         roundName: 'Round 22',
         date: convertTime("2015-03-22 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MBV',
         awaySht:'CCM',
         roundName: 'Round 23',
         date: convertTime("2015-03-27 19:40", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MCY',
         awaySht:'BBR',
         roundName: 'Round 23',
         date: convertTime("2015-03-28 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'PTH',
         awaySht:'WSW',
         roundName: 'Round 23',
         date: convertTime("2015-03-28 21:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WPX',
         awaySht:'SFC',
         roundName: 'Round 23',
         date: convertTime("2015-03-29 15:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'NUJ',
         awaySht:'ADU',
         roundName: 'Round 23',
         date: convertTime("2015-03-29 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'BBR',
         awaySht:'CCM',
         roundName: 'Round 24',
         date: convertTime("2015-04-02 20:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WSW',
         awaySht:'MCY',
         roundName: 'Round 24',
         date: convertTime("2015-04-03 19:40", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'SFC',
         awaySht:'ADU',
         roundName: 'Round 24',
         date: convertTime("2015-04-04 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WPX',
         awaySht:'MBV',
         roundName: 'Round 24',
         date: convertTime("2015-04-05 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'NUJ',
         awaySht:'PTH',
         roundName: 'Round 24',
         date: convertTime("2015-04-06 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MBV',
         awaySht:'NUJ',
         roundName: 'Round 25',
         date: convertTime("2015-04-10 19:40", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'PTH',
         awaySht:'SFC',
         roundName: 'Round 25',
         date: convertTime("2015-04-10 21:45", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'ADU',
         awaySht:'BBR',
         roundName: 'Round 25',
         date: convertTime("2015-04-11 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'CCM',
         awaySht:'WSW',
         roundName: 'Round 25',
         date: convertTime("2015-04-11 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MCY',
         awaySht:'WPX',
         roundName: 'Round 25',
         date: convertTime("2015-04-12 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WPX',
         awaySht:'CCM',
         roundName: 'Round 26',
         date: convertTime("2015-04-17 17:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'NUJ',
         awaySht:'SFC',
         roundName: 'Round 26',
         date: convertTime("2015-04-17 19:45", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WSW',
         awaySht:'ADU',
         roundName: 'Round 26',
         date: convertTime("2015-04-18 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'BBR',
         awaySht:'MBV',
         roundName: 'Round 26',
         date: convertTime("2015-04-18 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'PTH',
         awaySht:'MCY',
         roundName: 'Round 26',
         date: convertTime("2015-04-19 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'BBR',
         awaySht:'NUJ',
         roundName: 'Round 27',
         date: convertTime("2015-04-24 19:40", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WSW',
         awaySht:'PTH',
         roundName: 'Round 27',
         date: convertTime("2015-04-25 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'ADU',
         awaySht:'MCY',
         roundName: 'Round 27',
         date: convertTime("2015-04-25 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WPX',
         awaySht:'SFC',
         roundName: 'Round 27',
         date: convertTime("2015-04-26 15:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MBV',
         awaySht:'CCM',
         roundName: 'Round 27',
         date: convertTime("2015-04-26 17:00", "Australia/Brisbane","UTC")},
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
/**
                                                            //load a new set of rounds
                                                            Team.findOne({shtcode:fixtureData.winner}, function(err, winner){
                                                                Fixture.update({homeTeam: homeTeam, awayTeam: awayTeam, closeDate: fixtureData.date, event: event._id, league: league._id},
                                                                {$set:{round: round._id}},
                                                                    {upsert: true}, function(err) {if (err) console.log("Fixture update Error:"+err.toString())}
                                                                    );
                                                            });

 **/         

                                                            // load the results for the round
                                                            Team.findOne({shtcode:fixtureData.winner}, function(err, winner){
                                                                Fixture.update({homeTeam: homeTeam, awayTeam: awayTeam, closeDate: fixtureData.date, event: event._id, league: league._id},
                                                                {$set:{homeScore: fixtureData.homeScore, awayScore:fixtureData.awayScore, scoreDifference: fixtureData.scoreDifference,winner: winner,
                                                                    homeTeamLeaguePoints: fixtureData.homeTeamLeaguePoints, awayTeamLeaguePoints: fixtureData.awayTeamLeaguePoints, round: round._id}},
                                                                    {upsert: true}, function(err) {if (err) console.log("Fixture update Error:"+err.toString())}
                                                                    );
                                                            });


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


//updateCompetiion
function updateCompetition(){
    models.User.findOne({'local.email': "darcy@araitanga.com"}, function (err, user) {
        if (err) console.log("ERROR:"+err.toString());
        else{
            
            models.User.findOne({'local.email': "leslie@araitanga.com"}, function (err, user2) {
                if (err) console.log("ERROR:"+err.toString());
                else{
            
                    models.League.findOne({'name': "A-League"}, function (err, league) {
                        if (err) console.log("ERROR:"+err.toString());
                        else{
                            
                            models.Event.findOne({'name': "2013/14 Season"}, function (err, event) {
                                if (err) console.log("ERROR:"+err.toString());
                                else{
                            
                                    models.Competition.update({name: 'test Comp-Darcyonly'},
                                        {$set: {
                                            usersAccepted: [user._id],
                                            league: league._id,
                                            event: event._id
                                        }},
                                        {upsert: true},
                                        function(err){
                                            if (err) console.log("Round update Error:"+err.toString());
                                        }
                                    );
                                        
                                    models.Competition.update({name: 'test Comp-leslieonly'},
                                        {$set: {
                                            usersAccepted: [user2._id],
                                            league: league._id,
                                            event: event._id
                                        }},
                                        {upsert: true},
                                        function(err){
                                            if (err) console.log("Round update Error:"+err.toString());
                                        }
                                    );

                                    models.Competition.update({name: 'test Comp-2users'},
                                        {$set: {
                                            usersAccepted: [user._id,user2._id],
                                            league: league._id,
                                            event: event._id
                                        }},
                                        {upsert: true},
                                        function(err){
                                            if (err) console.log("Round update Error:"+err.toString());
                                        }
                                    );
                                }
                            });
                            
                        }
                    });
                }
            });
            
        }
        
    });

}


function addItemsToDB(){
    var Fixture = require('./app/models/fixture');
	var soccerPickFixture =require('./app/models/soccerPickFixture');
	var countLoop = 0;
	
	soccerPickFixture.find({}).exec(function(err,picks){
	    picks.forEach(function(pick){
	       console.log(pick); 
	       Fixture.findById(pick.fixture).exec(function(err, fixture){
    	       countLoop ++;
	           console.log('%s: Pick:%s | round: %s',countLoop,pick.id, fixture.round);
                soccerPickFixture.findByIdAndUpdate(pick.id, {round: fixture.round}).exec(function(err,updated){});
	       });
//	       countLoop ++;
//	       console.log('%s: Pick:%s',countLoop,pick.id);
	    });
	});

}


function removeItemsFromDB(){
/**
	var soccerPickFixture =require('./app/models/soccerPickFixture');
	var countLoop = 0;
	
	soccerPickFixture.find({}).exec(function(err,picks){
	    picks.forEach(function(pick){
	       console.log(pick); 
	       soccerPickFixture.findByIdAndRemove(pick.id).exec(function(err,pickfix){
    	       countLoop ++;
    	       console.log('%s',countLoop);
	           
	       })
//	       countLoop ++;
//	       console.log('%s: Pick:%s',countLoop,pick.id);
	    });
	});
**/
    var fixture = require('./app/models/fixture');
    var round = require('./app/models/round');
    var team = require('./app/models/team');
    round.findOne({name:"Round 2", event:'542a5f2392bef71ffb812bcb'}).exec(function(err,result){
        fixture.find({round:result.id}).populate('homeTeam awayTeam').exec(function(err,fixtures){
            fixtures.forEach(function(fix){
                console.log('%s:%s',fix.homeTeam.name,fix.awayTeam.name);
               //fixture.findByIdAndRemove(fix.id).exec(function(err,response){
                   //console.log('done');
               //});
            });
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
mongoose.connect('mongodb://golog:gogogadget@kahana.mongohq.com:10088/tipping2');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback(){
    //updateLeagues();
    //updateEvent();
    //updateTeams();
    // updateRounds("A-League","2014/15 Season");
    //updateFixtures("A-League","2014/15 Season");
    updateFixtureResults("A-League","2014/15 Season");
    //updateUsers();
    //loadCompetitions();
    //updatePicks('leslie@araitanga.com', 'test Comp-leslieonly')
    //addItemsToDB();
    //removeItemsFromDB();

    console.log("done");
});