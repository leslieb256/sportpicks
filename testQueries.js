// TODO: Addcountry Flag
// load the remaining 2013/14 fixture data, ony loaded round 1 and 2
// have not loaded goals for players yet for golden boot calc.
// should use an array to store who scored in each match as I might want to call that back?

// TODO nodemailer to create the emails so that it can send reminders to people,
// find a graphing thing so that it can make graphs available, sounds like D3 is a graphing thing.
// minght need to generate  results page and link to it via emails. Should
// should do %age selections for fixture for comp AND all people using system

// * Should also have comp closing options, so that you can close on round close (1 hr before first game, fixture close)
 
var mongoose = require('mongoose');
var async = require('async');
//var models = require('./models');
var Competition = require('./app/models/competition');
var Event = require('./app/models/event');
var League = require('./app/models/league');
var Round = require('./app/models/round');
var Fixture = require('./app/models/fixture');
var User = require('./app/models/user');
var Point = require('./app/models/point');
var FixturePick = require('./app/models/fixturePick');
//var scoring = require('./scoring');


//helper function

function updateScoreByFixtureId(fixtureId){
    Fixture.findById(fixtureId).exec(function(err, fixture){
        if (err) console.log("fixture look up ERROR:"+err.toString());
        else{
            async.series([
                updateScore(fixture),
                updateCompetitionFixtureRanking(fixture),
                updateCompetitionRoundRanking(fixture),
                updateCompetitionEventRanking(fixture),
            ], function(err){
                if (err){console.log('ERROR on scoreUpdate for fixture: %s',fixtureId)}
            }); 
        }
    });
}

function bulkScoreUpdate(fixtureIdArray){
    fixtureIdArray.forEach(function(fixture){
       updateScoreByFixtureId(fixture); 
    });
    
}

function fixturesInRound(round_id){
    Round.findOne({_id:  round_id }, function (err, round) {
        if (err) console.log("ERROR:"+err.toString());
        else{
            console.log('should have someting here for ROUND %s',round);
            Fixture.find({round: round._id})
                .populate('homeTeam','name')
                .populate('awayTeam','name')
                .sort('date')
                .exec(function(err,fixtures){
                    fixtures.forEach(function(fixture){
                       console.log('%s: %s :%s v %s', fixture.date,fixture._id, fixture.homeTeam.name, fixture.awayTeam.name); 
                    });
            });
        }
    });
}

function scoreFixture(fixture){
    /**
     * Takes a fixture object and calcuates the score for each user who has a pick for that fixture.
     **/
    SoccerPickFixture.find({fixture:fixture._id}).exec(function(err,picks){
       //console.log('PICKS\n%s',picks);
       picks.forEach(function(userPick){
            console.log("PICKS\n%s",userPick);
            console.log('FIXTURE\nfixture:%s', fixture);
            console.log('\n=====================\n');
            // calc winning score and update db if score is not zero

            var pickPoints = scoring.soccerFixtureScoring(userPick, fixture, [{type:"winner", points:7},{type:"scoreDifference", points:3}]);
            Point.update({
                type: 'fixture',
                user: userPick.user,
                competition: userPick.competition,
                event: fixture.event,
                round: fixture.round,
                fixture: fixture._id},
                {$set: {points: pickPoints}},
                {upsert: true},
                function(err){
                    if (err) console.log("ERROR:"+err.toString());
            console.log("FIXTURE SCORED");
                }
            );
            
       });
    });
}

function updateCompetitionFixtureRanking(fixture){
    /**
     * Takes a fixture object and puts the users in order based on their points for the fixture.
     **/
    Competition.find({event:fixture.event}).exec(function(err,competition){
        if (err) console.log("ERROR:"+err.toString());
        else{
            competition.forEach(function(comp){
                Point.find({competition:comp, fixture:fixture}).sort('-points').exec(function(err, userPoints){
                    if (err) console.log("ERROR:"+err.toString());
                    else {
                        var bestRank = 1;
                        var lastPoints = -1;
                        var rankingArray = [];
                        //console.log('ORIGDATA');                        
                        async.eachSeries(userPoints, function(userPoint,callback){

                           //console.log('%s: points:%s',userPoint._id,userPoint.points);
                           if(userPoint.points>lastPoints){
                               rankingArray.push({pointID:userPoint._id,ranking:bestRank});
                               bestRank += 1;
                               lastPoints = userPoint.points;
                           }
                           else{
                              rankingArray.push({pointID:userPoint._id,ranking:bestRank});
                           }
                           callback();
                        }, function (err){
                            if (err) {
                                console.log('error in ranking users');
                            }
                            else {
                                console.log('users for competition: %s RANKED', comp._id);
                                rankingArray.forEach(function(item){
                                   //console.log('%s\t%s',item.pointID,item.ranking);
                                    Point.update({_id:item.pointID},{ $set: {ranking:item.ranking}}, function(err){if (err){console.log('updateof ranking failed')}});

                                });
                            }
                        });
                    }
                });

            });
        }
    });
}

function updateCompetitionRoundRanking(fixture){
    /**
     * takes a fixture and finds all competitions the fixture appears in
     * calculates the points for the round the fixutre is in for each comp
     * and updates the ranking for each user in the comp for that round
     **/
     //see http://docs.mongodb.org/manual/reference/operator/aggregation/group/
    Competition.find({event:fixture.event}).exec(function(err,competition){
        if (err) console.log("ERROR:"+err.toString());
        else{
            competition.forEach(function(comp){
                Point.aggregate([
                    {$match:{
                        type: "fixture",
                        competition:comp._id,
                        round:fixture.round
                    }},
                    {$group:{
                        _id: "$user",
                        total: {$sum : "$points"}
                    }},
                    {$sort: {
                        total: -1
                    }}
                ], function(err, result){
                        if (err) {console.log('ERROR IN Round Ranking %s',err)}
                        else{
                            console.log(result);

                            var bestRank = 1;
                            var lastPoints = -1;
                            var rankingArray = [];
                            //console.log('ORIGDATA');                        
                            async.eachSeries(result, function(userPoint,callback){
    
                               //console.log('%s: points:%s',userPoint._id,userPoint.points);
                               if(userPoint.total>lastPoints){
                                   rankingArray.push({user:userPoint._id,points:userPoint.total,ranking:bestRank});
                                   bestRank += 1;
                                   lastPoints = userPoint.total;
                               }
                               else{
                                  rankingArray.push({user:userPoint._id,points:userPoint.total,ranking:bestRank});
                               }
                               callback();
                            }, function (err){
                                if (err) {
                                    console.log('error in ranking round');
                                }
                                else {
                                    console.log('users for competition ROUND: %s RANKED', comp._id);
                                    rankingArray.forEach(function(item){
                                       //console.log('%s\t%s',item.pointID,item.ranking);
                                      
                                        Point.update({
                                            type: 'round',
                                            user: item.user,
                                            competition: comp._id,
                                            event: fixture.event,
                                            round: fixture.round},
                                            {$set: {points: item.points,ranking:item.ranking}},
                                            {upsert: true},
                                            function(err){
                                                if (err) console.log("ERROR:"+err.toString());
                                        console.log("FIXTURE SCORED");
                                            }
                                        );
                                    });
                                }
                            });

                        }
                });
            });
        }
    });
}

function updateCompetitionEventRanking(fixture){
    /**
     * takes a fixture and finds all competitions the fixture appears in
     * calculates the points for the competition the fixutre is in for each comp
     * and updates the ranking for each user in the comp for that round
     **/
    Competition.find({event:fixture.event}).exec(function(err,competition){
        if (err) console.log("ERROR:"+err.toString());
        else{
            //console.log('IN UPDATE COMP');
            //console.log(competition);
            competition.forEach(function(comp){
                Point.aggregate([
                    {$match:{
                        type: "round",
                        competition:comp._id,
                    }},
                    {$group:{
                        _id: "$user",
                        total: {$sum : "$points"}
                    }},
                    {$sort: {
                        total: -1
                    }}
                ], function(err, result){
                        if (err) {console.log('ERROR IN Round Ranking %s',err)}
                        else{
                            //console.log('FOR COMP: %s',comp.name);
                            console.log(result);

                            var bestRank = 1;
                            var lastPoints = -1;
                            var rankingArray = [];
                            //console.log('ORIGDATA');                        
                            async.eachSeries(result, function(userPoint,callback){
    
                               //console.log('%s: points:%s',userPoint._id,userPoint.points);
                               if(userPoint.total>lastPoints){
                                   rankingArray.push({user:userPoint._id,points:userPoint.total,ranking:bestRank});
                                   bestRank += 1;
                                   lastPoints = userPoint.total;
                               }
                               else{
                                  rankingArray.push({user:userPoint._id,points:userPoint.total,ranking:bestRank});
                               }
                               callback();
                            }, function (err){
                                if (err) {
                                    console.log('error in ranking round');
                                }
                                else {
                                    console.log('users for competition ROUND: %s RANKED', comp._id);
                                    rankingArray.forEach(function(item){
                                       //console.log('%s\t%s',item.pointID,item.ranking);
                                      
                                        Point.update({
                                            type: 'event',
                                            user: item.user,
                                            competition: comp._id,
                                            event: fixture.event},
                                            {$set: {points: item.points,ranking:item.ranking}},
                                            {upsert: true},
                                            function(err){
                                                if (err) console.log("ERROR:"+err.toString());
                                        console.log("FIXTURE SCORED");
                                            }
                                        );
                                    });
                                }
                            }); 

                        }
                });
            });
        }
    });
}


function updateScore(fixture){
    //async.series
        // for each comp goes through the fixtures and updates the points for each round
    //async series 3 
        // for each comp update the user positions in the ficutres and round CAN PROBABLY DOW TH THE ABOVE
    // async series
        // do the same but get all the rounds and update the events with a total event score
    // BSAICALLY ROLLING THE SCORING UP to EVENT LEVEL through multple queries.
    async.series([
            scoreFixture(fixture),
            updateCompetitionFixtureRanking(fixture),
            updateCompetitionRoundRanking(fixture)
        ], 
        function(err){
            if (err) console.log("ERROR:"+err.toString());            
        }
    );
}

function usersCompetitions(userId){
    
    User.find({usersAccepted:userId}).populate('event league').exec(function(err, competitionList){
        console.log(competitionList);
        //return competitionList;
    });
}

function testDrill(competition,round){
	var Fixture = require('./app/models/fixture');
	var soccerPickFixture =require('./app/models/soccerPickFixture');
	var Team = require('./app/models/team'); //needed for the populate for fixtures.

	Fixture.find({round:round}).populate('homeTeam awayTeam').sort('date').exec(function (err,fixtures){
	if (err) {console.log('ERR: fixtures page on fixtures')}
		else{
			soccerPickFixture.find({competition:competition, round:round}).populate('winner').exec(function(err,picks){
				var bigSet= createFixtureLookup(picks);
				console.log(bigSet['53fc6408b918a6b661d423df'].winner.name);
				
			});
		}
	});

}

function createFixtureLookup(queryData){
	//console.log('ALL RANK DATA:\n%s',queryData);
	var lookup = {};
	for (var i = 0; i<queryData.length; i++){
		lookup[queryData[i].fixture] = queryData[i];
	}
	return lookup;
}

function getFixtures(){

    Fixture.find({}).exec(function(err, fixtures){
        fixtures.forEach(function (fix){
            Fixture.findByIdAndUpdate(fix.id, {closeDate: fix.date}).exec(function(err, result){
                console.log('fixture %s',fix.id);
            });
        });
    });
    
}

function localiseTime(utcTime,localTimezone){
    var moment = require('moment-timezone');
    var origTime =moment.tz(utcTime,"UTC");
    var localTime = origTime.clone().tz(localTimezone);
    console.log('ORIGTIME: %s',origTime.format());
    console.log('LOCALTIM: %s',localTime.format());
    return localTime.format();
}

function localiseCloseDate(data,localTimezone){
	//relies on the data having a "closeDate" 
	//uses moment-timezone timezone descriptions.
	//converts dates in closeDate to users set local time.
	//console.log('In localise Close Date: %s',localiseTime(data.closeDate,localTimezone));
	data.closeDateLocaTime = localiseTime(data.closeDate,localTimezone);
	
    //console.log(localiseTime(data.closeDate,localTimezone))
	return data;
}


function localiseCloseDates(data,localTimezone){
	//relies on the data having a "closeDate" 
	//uses moment-timezone timezone descriptions.
	//converts dates in closeDate to users set local time.
	data.forEach(function (item){
		item.closeDateLocaTime = localiseTime(item.closeDate,localTimezone);
	});
	return data;
}

function testMomentTZ(fixtureID){
    //http://media.foxsports.com.au/football/A-League_Draw_2014-15.pdf
    Fixture.findById(fixtureID).lean().exec(function(err, fixture){
        console.log('ORIG FIXTURE:%s',fixture.closeDate);
        console.log('NEW FIX:%s',localiseCloseDate(fixture, "Pacific/Auckland").closeDate);
    });
    console.log('done');
}
function picksAvailByComp(userId){
    //comptisiotn, fixture
    //by competition for leslie in roseneath comp
    Competition.find({usersAccepted:userId}).lean().exec(function (err, competitions){
        if (err) {console.log('ERROR: failed to get count of comps')}
        else {
            console.log('COMPS:%s',competitions);
            //Fixture.find({event:{$in:eventIds(competitions)}}).exec(function (err,fixtures)
            Fixture.aggregate([
                    {$match: {event:{$in:eventIds(competitions)}} },
                    {$group: {_id: "$event", count: {$sum: 1 } } }],
                    function (err, result){
                        if (err) {console.log('ERROR in counting total fixtures')}
                        else {
                            return createNumOfFixturesLookupByComp(result,competitions);
                        }
                    });
        }
    });
}

function createNumOfFixturesLookupByComp(listByEvent, listByComp){
    var lookup = {};
    console.log('EVENT:');
    listByComp.forEach(function (comp){
        listByEvent.forEach(function (event){
            console.log('EVENT.id:%s;COMP.event:%s - %s',event._id, comp.event, (String(event._id) == String(comp.event)));
            if (String(event._id) == String(comp.event)) {
                lookup[comp._id] = event.count;
            }
        });
    });
    return lookup;
}

function createEventLookup(queryData){
	//console.log('ALL RANK DATA:\n%s',queryData);
	var lookup = {};
	for (var i = 0; i<queryData.length; i++){
		lookup[queryData[i].event] = queryData[i];
	}
	return lookup;
}

function create_IdLookup(queryData){
	var lookup = {};
	for (var i = 0; i<queryData.length; i++){
		lookup[queryData[i]._id] = queryData[i];
	}
	return lookup;
}


function picksMade(){
    //soccerpicks

    SoccerPickFixture.aggregate([
            // the mongoose.types.ObjectId is a fudgy casting to make the query work
            {$match: {user:mongoose.Types.ObjectId('5401512fb918a6b661d42b77')} },
            {$group: {_id: "$competition", count:{$sum: 1}}}],
            function (err, result){
                console.log('TEST: %s', create_IdLookup(result));
                
            }
        );

}


function idArray(data){
    var result = [];
    data.forEach(function (item){
        result.push(item.id);
    });
    return result
}

function eventIds(data){
    var result = [];
    data.forEach(function (item){
        result.push(item.event);
    });
    return result
}

function picksAvailByRound(userId){
    //comptisiotn, fixture
    //by competition for leslie in roseneath comp
    Competition.find({usersAccepted:userId}).lean().exec(function (err, competitions){
        if (err) {console.log('ERROR: failed to get count of comps')}
        else {
            console.log('COMPS:%s',competitions);
            //Fixture.find({event:{$in:eventIds(competitions)}}).exec(function (err,fixtures)
            Fixture.aggregate([
                    {$match: {event:{$in:eventIds(competitions)}} },
                    {$group: {_id: "$event", count: {$sum: 1 } } }],
                    function (err, result){
                        if (err) {console.log('ERROR in counting total fixtures')}
                        else {
                            return createNumOfFixturesLookupByComp(result,competitions);
                        }
                    });
        }
    });
}

function testScoringOptions(scoringOptions, pick) {
    var actualDiff = 16;
    var totalPoints = 0;
    var correctMargin = -1;
    //first determine which margin value was the correct one to choose
    //if the margin is the end catch all (x+) it returns -1
    for (var i = 0; i < scoringOptions.margins.length; i++) {
        console.log('actualDiff:%s | optionMaring: %s',actualDiff, scoringOptions.margins[i]);
        if ( actualDiff <= scoringOptions.margins[i]){
            correctMargin = scoringOptions.margins[i];
            break;
        }
    }
    if (pick.scoreDifference == correctMargin) { totalPoints += scoringOptions.points; }
}


// connect to the database
mongoose.connect('mongodb://golog:gogogadget@kahana.mongohq.com:10088/tipping2');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback(){

   // TEST UPDATE SCORE
   //updateScoreByFixtureId('53fc6408b918a6b661d423df'); //ROUND1
   //updateScoreByFixtureId('53fc6408b918a6b661d423e4'); //ROUND2
    //bulkScoreUpdate(['53fc6408b918a6b661d423df','53fc6408b918a6b661d423e0','53fc6408b918a6b661d423e1','53fc6408b918a6b661d423de','53fc6408b918a6b661d423e6']); //ROUND1
    //bulkScoreUpdate(['53fc6408b918a6b661d423e4','53fc6408b918a6b661d423e2','53fc6408b918a6b661d423e3','53fc6408b918a6b661d423e5','5401748eb918a6b661d42b7c']); //ROUND2
    //fixturesInRound('53fc63e6b918a6b661d423c1');
    
    //usersCompetitions('5401512fb918a6b661d42b77');
    //User.findById('5401512fb918a6b661d42b77').exec(function(err,user){
    //        user.competitionRanking(function(err, comps){
    //            console.log(comps);
    //        });
    //});
    
    //testDrill('540151b0b918a6b661d42b7a','53fc63e6b918a6b661d423bf');
    //getFixtures()
   // console.log('TEST: %s',picksAvailByComp('5401512fb918a6b661d42b77'));
    //picksMade();
    //console.log(testScoringOptions({type:'scoreDifference',margins:[7,14], points:5},{scoreDifference:7}));
    
    //updateCummulativeRoundPoints('542bd1842367c9209a739130');

    
});


