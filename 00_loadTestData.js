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
        firstFixture: "2014-10-10 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 2',
        roundPosition:2 ,
        firstFixture: "2014-10-17 19:30",
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
        firstFixture: "2014-11-07 17:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 6',
        roundPosition: 6,
        firstFixture: "2014-11-14 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 7',
        roundPosition: 7,
        firstFixture: "2014-11-21 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 8',
        roundPosition: 8,
        firstFixture: "2014-11-28 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 9',
        roundPosition: 9,
        firstFixture: "2014-12-03 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 10',
        roundPosition: 10,
        firstFixture: "2014-12-04 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 11',
        roundPosition: 11,
        firstFixture: "2014-12-12 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 12',
        roundPosition: 12,
        firstFixture: "2014-12-19 20:00",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 13',
        roundPosition: 13,
        firstFixture: "2014-12-26 17:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 14',
        roundPosition: 14,
        firstFixture: "2014-12-30 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 15',
        roundPosition: 15,
        firstFixture: "2015-01-03 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 16',
        roundPosition: 16,
        firstFixture: "2015-01-24 17:00",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 17',
        roundPosition: 17,
        firstFixture: "2015-02-06 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 18',
        roundPosition: 18,
        firstFixture: "2015-02-13 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 19',
        roundPosition: 19,
        firstFixture: "2015-02-20 20:00",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 20',
        roundPosition: 20,
        firstFixture: "2015-02-27 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 21',
        roundPosition: 21,
        firstFixture: "2015-03-06 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 22',
        roundPosition: 22,
        firstFixture: "2015-03-12 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 23',
        roundPosition: 23,
        firstFixture: "2015-03-20 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 24',
        roundPosition: 24,
        firstFixture: "2015-03-27 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 25',
        roundPosition: 25,
        firstFixture: "2015-04-02 20:00",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 26',
        roundPosition: 26,
        firstFixture: "2015-04-10 19:30",
        ffTimeZone: "Australia/Brisbane"
        },
        {name:'Round 27',
        roundPosition: 27,
        firstFixture: "2015-04-17 19:30",
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
        {name:'Grand Final',
        roundPosition: 30,
        //firstFixture: "2014-10-10 19:30",
        //ffTimeZone: "Australia/Brisbane"
        },
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
                            //{$set: {roundPosition: roundData.roundPosition,closeDate:(convertTime(roundData.firstFixture, roundData.ffTimeZone,"UTC"))}},
                            {$set: {roundPosition: roundData.roundPosition}},
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
         date: convertTime("2014-12-10 15:00", "Australia/Brisbane","UTC")},

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
**/

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
         date: convertTime("2014-10-18 19:30", "Australia/Brisbane","UTC")}
/**
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

/**
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
**/

/**
    // *** ROUND 4 ***

        {type: 'match',
         homeSht:'MCY',
         awaySht:'ADU',
         roundName: 'Round 4',
         date: convertTime("2014-10-31 19:40", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'PTH',
         awaySht:'NUJ',
         roundName: 'Round 4',
         date: convertTime("2014-11-01 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'SFC',
         awaySht:'CCM',
         roundName: 'Round 4',
         date: convertTime("2014-11-02 17:00", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'MBV',
         awaySht:'WPX',
         roundName: 'Round 4',
         date: convertTime("2014-11-03 19:30", "Australia/Brisbane","UTC")},

        {type: 'match',
         homeSht:'WSW',
         awaySht:'BBR',
         roundName: 'Round 4',
         date: convertTime("2014-12-03 19:30", "Australia/Brisbane","UTC")},
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
    //updateRounds("A-League","2014/15 Season");
    //updateFixtures("A-League","2014/15 Season");
    updateFixtureResults("A-League","2014/15 Season");
    //updateUsers();
    //loadCompetitions();
    //updatePicks('leslie@araitanga.com', 'test Comp-leslieonly')
    //addItemsToDB();
    //removeItemsFromDB();
    console.log("done");
});