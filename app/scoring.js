/**
 * SCORING MODULE
 * holds all of the scoring functions so they can be edited/reviewed in one place.
 * These functions all return a number which is the points the user has earned from that pick
 * 
 * VALID SCORING OPTIONS
 * =====================
 * 
 * winner
 *  points - the points you get if the winner is correct
 * 
 * exactResult
 *  points - the points you get if you select the exact result
 *  lossMultiplier - for each point you are differnet to the home or away score you lose the absolute differece*loss multiplier
 *  needsWinner - boolean - do you need to have picked the winner before you can get these points NOT IMPLEMENTED YET
 * 
 * scoreDifference
 *  points - points if you get the score difference (margin) right
 *  margins [x,y,z...] - an array of the possible brackets for score difference the first number is 
 *               0 - x, then from gt x to y, then from gt than y to z, then z+
 *  needsWinner - boolean - do you need to have picked the winner before you can get these points
 *  
 *  The user Pick if the want x+ should be recorded as "-1" eg: if the options are: 0,1,2+
 * 
 **/
 
function fixtureScoring(userPick, fixtureResult, competition){
    //set fixture points to zero
    var totalPoints = 0;
    console.log("inSCORING");
    
    // leter need to make it look for fixture type first.
    //if match then do the below else needs to apply correct scoring for
    // goldenboot or evetnwinner
    competition.scoring.forEach(function(scoringOption){
        if (scoringOption.type == "winner"){
            //console.log("PICK:%s | ACTUAL: %s | TRUE?:%s", userPick.winner, fixtureResult.winner,( String(userPick.winner)==String(fixtureResult.winner) ) );
            if (String(userPick.winner)==String(fixtureResult.winner)){
                totalPoints += scoringOption.points;
                //console.log("Winner so 7 points:%s", totalPoints);
            }
        }
        
        if ( (scoringOption.type == "scoreDifference") && (!(scoringOption.needsWinner)) || 
             ( (scoringOption.type == "scoreDifference") && (scoringOption.needsWinner) && (String(userPick.winner)==String(fixtureResult.winner)) ) ){
                var correctMargin = -1; // if the user has select the greater than "x" catch all then the correct response is -1.
                //first determine which margin value was the correct one to choose
                //if the margin is the end catch all (x+) it returns -1
                for (var i = 0; i < scoringOption.margins.length; i++) {
                    //console.log('actualDiff:%s | optionMaring: %s',actualDiff, scoringOptions.margins[i]);
                    if ( fixtureResult.scoreDifference <= scoringOption.margins[i]){
                        correctMargin = scoringOption.margins[i];
                        break;
                    }
                }
                if (userPick.scoreDifference == correctMargin) { totalPoints += scoringOption.points; }            
        } 
        
        if ( scoringOption.type == "exactResult" ){
            if ( ( !(scoringOption.needsWinner)) || 
                 (  (scoringOption.needsWinner) && (String(userPick.winner)==String(fixtureResult.winner))) ) { 
                if ( (scoringOption.points - (Math.abs(userPick.homeScore - fixtureResult.homeScore)*scoringOption.lossMultiplier) 
                                          - (Math.abs(userPick.awayScore - fixtureResult.awayScore)*scoringOption.lossMultiplier) ) >0 ) {
                    totalPoints += scoringOption.points - (Math.abs(userPick.homeScore - fixtureResult.homeScore)*scoringOption.lossMultiplier) 
                                          - (Math.abs(userPick.awayScore - fixtureResult.awayScore)*scoringOption.lossMultiplier);
                }
                //console.log("USER: %s, FIXTURE: %s, GD so +3 points:%s", userPick.scoreDifference, fixtureResult.scoreDifference,totalPoints);
            }
        }
        
    });
    console.log('%s: %s',competition.name,totalPoints );
    return totalPoints;
}
exports.FixtureScoring = fixtureScoring;

	// =====================================
	// SCORING AND RANKING =================
	// =====================================
	// Scores a single fixture and updates the rankings for
	// competition and round and fixture.

function updateScoreByFixtureId(fixtureId){
    var Fixture = require('../app/models/fixture');
    var async = require('async');
    Fixture.findById(fixtureId).exec(function(err, fixture){
        if (err) console.log("fixture look up ERROR:"+err.toString());
        else{
            async.series([
                scoreFixture(fixture),
                updateCompetitionFixtureRanking(fixture),
                updateCompetitionRoundRanking(fixture),
                updateCompetitionEventRanking(fixture),
            ], function(err, results){
                if (err){console.log('ERROR IN UPDATE: %s',err);}
                    console.log('ALL DONE SCORING');
            }); 
        }
    });
}

function updateScoreForFixtureList(fixtureList){
    var async = require('async');
    var Fixture = require('../app/models/fixture');

    async.eachSeries(fixtureList, function(fixtureId, list_cb){
        Fixture.findById(fixtureId).exec(function(err, fixture){
            if (err) {console.log("fixture look up ERROR:"+err.toString(), list_cb(err))}
            else {
                
                async.series([
                    scoreFixture(fixture),
                    updateCompetitionFixtureRanking(fixture),
                    updateCompetitionRoundRanking(fixture),
                    updateCompetitionEventRanking(fixture)
                ], 
                function (err, results){
                    if (err){console.log('ASYNCWATERFALL FN: ERROR: %s',err);list_cb(err)}
                    else {
                        // do the callback to get the next fixture
                        list_cb();
                    }
                 }
                );
            }
        });
    }, 
    function(err){
        if (err){console.log('ASYNC SERIES FUNCTION: error in processing fixture')}
    }); 
}



/**
 * 
var makeFun = function (s) {
  return function(callback){
    var data = 'testtesttesttesttesttesttesttesttesttesttest';
    fs.writeFile(s + '.js', data, function (error) {console.log(s); callback(error)});
  }
};

async.series([
  makeFun('a_1'),
  makeFun('a_2'),
  makeFun('a_3'),
  makeFun('a_4'),
  makeFun('a_5'),
  makeFun('a_6')
]);

**/

function createFixturePickLookup(queryData){
    // create lookup by user Id for fixture picks
	var lookup = {};
	for (var i = 0; i<queryData.length; i++){
		lookup[queryData[i].user] = queryData[i];
	}
	return lookup;
}

function scoreFixture(fixtureId){
    // compares users picks to a fixture rsult and scores basedon the scoring options in the competition.
    // This is setup as a callback function for use with async module
    return function (callback){
        var Competition = require('../app/models/competition');
        var Fixture = require('../app/models/fixture');
        var FixturePick = require('../app/models/fixturePick');
        var Event = require('../app/models/event');
        var User = require('../app/models/user');
        var Point = require('../app/models/point');
        
        Fixture.findById(fixtureId).exec(function(err,fixture){
            if (err){console.log('Error: %s', err)}
            else {
                Competition.find({event:fixture.event}).exec(function(err, competitions){
                    if (err){console.log('Error: %s', err)}
                    else {   
                        //console.log("\nSCOREING: COMPS WITH THE FIXTURE\n");console.log(competitions);
                        competitions.forEach(function(competition){
                            if (err){console.log('Error: %s', err);}
                            else {   
                               FixturePick.find({fixture:fixture._id, competition:competition._id}).exec(function(err, fixturePicks){
                                    if (err){console.log('Error: %s', err)}
                                    else {   
                                       //create a look up by userid for fixture picks
                                      var fixturePickLookup = createFixturePickLookup(fixturePicks);
                                      //console.log('\nFIXTURE PICKS\n');console.log(fixture)
                                      competition.usersAccepted.forEach(function(user){
                                          var pickPoints = 0;
                                          if(user in fixturePickLookup){
                                              //console.log('USER %s HAS A PICK', user);
                                              //console.log(fixturePickLookup[user]);
                                              pickPoints = fixtureScoring(fixturePickLookup[user], fixture,competition);
                                          }
                                          console.log('ScoreFixture: USER:%s POINTS:%s',user,pickPoints);
                                          Point.update({
                                              type: 'fixture',
                                              user: user,
                                              competition: competition.id,
                                              event: fixture.event,
                                              round: fixture.round,
                                              fixture: fixture.id},
                                              {$set: {points: pickPoints}},
                                              {upsert: true},
                                              function(err){
                                                  if (err) {console.log("ERROR:"+err.toString());callback(err)}
                                                  else {callback(null)}
                                              }
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
    };
}


function updateCompetitionFixtureRanking(fixture){
    /**
     * Takes a fixture object and puts the users in order based on their points for the fixture.
     * deisnged for use with async (uses callbacks)
     * 
     **/
     return function(callback){
        var Competition = require('../app/models/competition');
        var Point = require('../app/models/point');
        var async = require('async');
        console.log('2. IN updateCompetitionFixtureRanking');
        Competition.find({event:fixture.event}).exec(function(err,competition){
            if (err) console.log("ERROR:"+err.toString());
            else{
                competition.forEach(function(comp){
                    Point.find({competition:comp, fixture:fixture}).sort('-points').exec(function(err, userPoints){
                        if (err) console.log("ERROR:"+err.toString());
                        else {
                            var bestRank = 1;
                            var lastPoints = 0;
                            var rankingArray = [];
                            //console.log('ORIGDATA');                        
                            async.eachSeries(userPoints, function(userPoint){
    
                               //console.log('BEFORE FIXTURE RANKING: %s: points:%s',userPoint._id,userPoint.points);
                               if(userPoint.points>=lastPoints){
                                   rankingArray.push({pointID:userPoint._id,ranking:bestRank});
                                   lastPoints = userPoint.points;
                                   //console.log('\tFIXTURE RANKING: %s: points: %s, ranking:%s, last points:%s',userPoint._id,userPoint.points,bestRank,lastPoints)
                               }
                               else{
                                  bestRank += 1;
                                  rankingArray.push({pointID:userPoint._id,ranking:bestRank});
                                   lastPoints = userPoint.points;                              
                                  //console.log('\tFIXTURE RANKING: %s: ranking:%s, last points:%s',userPoint._id,bestRank,lastPoints)
                               }
                               
                            }, function (err){
                                if (err) {
                                    console.log('error in ranking users');callback(err);
                                }
                                else {
                                    //console.log('users for competition: %s RANKED', comp._id);
                                    rankingArray.forEach(function(item){
                                       //console.log('%s\t%s',item.pointID,item.ranking);
                                        Point.update({_id:item.pointID},{ $set: {ranking:item.ranking}}, 
                                            function(err){
                                                if (err){console.log('updateof ranking failed');callback(err)}
                                                else{callback(null)}
                                            });
    
                                    });
                                }
                            });
                        }
                    });
    
                });
            }
        });
     };
}

function updateCompetitionRoundRanking(fixture){
    /**
     * takes a fixture and finds all competitions the fixture appears in
     * calculates the points for the round the fixutre is in for each comp
     * and updates the ranking for each user in the comp for that round
     **/
     //see http://docs.mongodb.org/manual/reference/operator/aggregation/group/
     // designed for use in async.series
     return function(callback){
        var Competition = require('../app/models/competition');
        var Point = require('../app/models/point');
        var async = require('async');
    
        console.log('3. IN updateCompetitionRoundRanking');
    
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
                            if (err) {console.log('ERROR IN Round Ranking %s',err);callback(err)}
                            else{
                                //console.log(result);
    
                                var bestRank = 1;
                                var lastPoints = 0;
                                var rankingArray = [];
                                //console.log('ORIGDATA');                        
                                async.eachSeries(result, function(userPoint,callback){
        
                                   //console.log('%s: points:%s',userPoint._id,userPoint.points);
                                   if(userPoint.total>=lastPoints){
                                       rankingArray.push({user:userPoint._id,points:userPoint.total,ranking:bestRank});
                                       lastPoints = userPoint.total;
                                   }
                                   else{
                                      bestRank += 1;                               
                                      rankingArray.push({user:userPoint._id,points:userPoint.total,ranking:bestRank});
                                      lastPoints = userPoint.total;
                                   }
                                   callback();
                                }, function (err){
                                    if (err) {
                                        console.log('error in ranking round');
                                        callback(err);
                                    }
                                    else {
                                        //console.log('users for competition ROUND: %s RANKED', comp._id);
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
                                                    if (err) {console.log("ERROR:"+err.toString());callback(err)}
                                                    else {callback(null)}
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
     };
}

function updateCompetitionEventRanking(fixture){
    /**
     * takes a fixture and finds all competitions the fixture appears in
     * calculates the points for the competition the fixutre is in for each comp
     * and updates the ranking for each user in the comp for that round
     **/
     
     // designed fo use with asyn.series
     return function(callback){
        console.log('4. IN updateCompetitionEventRanking')
        var Competition = require('../app/models/competition');
        var Point = require('../app/models/point');
        var async = require('async');
    
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
                            if (err) {console.log('ERROR IN Round Ranking %s',err),callback(err)}
                            else{
                                //console.log('FOR COMP: %s',comp.name);
                                result.forEach(function (testing){
                                    //console.log('COMPEVENT: RANK:\n%s',testing);
                                });
    
                                var bestRank = 1;
                                var lastPoints = 0;
                                var rankingArray = [];
                                //console.log('ORIGDATA');                        
                                async.eachSeries(result, function(userPoint,callback){
        
                                   //console.log('%s: points:%s',userPoint._id,userPoint.points);
                                   if(userPoint.total>=lastPoints){
                                       rankingArray.push({user:userPoint._id,points:userPoint.total,ranking:bestRank});
                                       lastPoints = userPoint.total;
                                   }
                                   else{
                                      bestRank += 1;                               
                                      rankingArray.push({user:userPoint._id,points:userPoint.total,ranking:bestRank});
                                      lastPoints = userPoint.total;
                                   }
                                   callback();
                                }, function (err){
                                    if (err) {
                                        console.log('error in ranking round');
                                        callback(err);
                                    }
                                    else {
                                        //console.log('users for competition ROUND: %s RANKED', comp._id);
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
                                                    if (err) {console.log("ERROR:"+err.toString());callback(err)}
                                                    else{callback(null)}
                                            //console.log("FIXTURE SCORED");
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
     };
}

function updateCummulativeRoundPoints(eventId){
    var async = require('async');
    var Competition = require('../app/models/competition');
    var Round = require('../app/models/round');
    var Point = require('../app/models/point');
    //following schema required for populate
    var User = require('../app/models/user');
    var Event = require('../app/models/event');

    console.log('IN rankingChartData');

    Competition.find({event:eventId}).exec(function(err,competitionList){

        if(err){console.log('\tERR in getting Comptitions List: %s',err)}
        else {
            competitionList.forEach(function (competition){
                competition.usersAccepted.forEach(function(user){
                    //console.log(user.local.name);
                    Point.find({competition: competition, user:user, type:'round'}).populate('round').populate('user').lean().exec(function(err,points){
                        if(err){console.log('\tERR in getting Round Points: %s',err)}
                        else{
                            
                            // Sort the points data ascending by the round position.
                            points.sort(function (a,b){ return a.round.roundPosition - b.round.roundPosition; });
                            var totalPoints = 0;
                            var newPointsHistory = [];
                            var newCummulativePointsHistory=[];
                            var newHistoryTitles = [];
                            // need to waterfall this so that once the points history is calculated it can be stored in the compPoints for the user.
                            async.waterfall([
                                function collatePoints(collatePointsCallback){

                                    async.eachSeries(points, function(point, pointsCallback){
                                       totalPoints += point.points;
                                                                                             
                                       console.log('totalPoints: %s', totalPoints);
                                       newCummulativePointsHistory.push (totalPoints);
                                       //console.log('cummulatovePointsHistyr: %s', newCummulativePointsHistory);
                                       newHistoryTitles.push(point.round.name);
                                        //console.log('history titles: %s', newHistoryTitles);
                                       
                                       // Store cummulative point total for round in the points for the round along with the pointsHistory up to this round.
                                       Point.findByIdAndUpdate(point._id,{ $set: {pointsHistory: newPointsHistory, cummulativePoints: totalPoints, cummulativePointsHistory: newCummulativePointsHistory, historyTitles:newHistoryTitles } },
                                        function (err, updatedPoints){
                                            if (err){pointsCallback('Failed to update the cummulativePoints in Point')}
                                        });
                                        pointsCallback(null);
                                    });
                                    console.log('TEST BEFORE PASSING: cummulativePointsHistory:%s',newCummulativePointsHistory);
                                    collatePointsCallback(null, newPointsHistory,newCummulativePointsHistory, newHistoryTitles);
                                },
                                function storePointHistory (newPointsHistory, newCummulativePointsHistory, newHistoryTitles, sphCallback){
                                    console.log('TEST AFTER PASSING: cummulativePointsHistory:%s',newCummulativePointsHistory);
                                    // Store the cummulativePointsHistory in the compeitionPoint document
                                    Point.update({type:'event', user:user, competition:competition._id},
                                                 {$set: {pointsHistory: newPointsHistory, cummulativePointsHistory: newCummulativePointsHistory, historyTitles: newHistoryTitles}}, 
                                                 {upsert:false}, function(err){
                                                    if (err) {console.log('Failed to store cummulativePointsHistory in Point')}
                                                    else {console.log('Sotre good')}
                                     });
                                    sphCallback(null);
                                },
                                function (error) {if (error){console.log('error triggered: %s',error)}}
                            ]);
                        }
                    });
                    
                });
            });
            
        }
    })
}


    // =====================================
    // FAKE DATA FOR SCORING TESTING =======
    // =====================================
    
    // WARNING: The ID data used may be 'live data' DO NOT test DB writes with this data!
    
var testCompetition = {
  id: "TESTCOMPID",
  event: "TESTEVENT",
  league:"TESTLEAGUE",
  name: "TESTNAME",
  scoring: [
    {
      points: 1,
      type: "winner"
    },
    {
      margins: [0,10,20,30],
      points: 1,
      type: "scoreDifference",
      needsWinner: false
    }
  ],
}  

var testFixture = {
  _id: "FIXTUREID",
  awayScore: 0,
  awayTeam: "AWAYTEAM",
  awayTeamLeaguePoints: 0,
  closeDate: "2013-11-19T09:30:00Z",
  date: "2013-11-19T09:30:00Z",
  event: "EVENTID",
  homeScore: 4,
  homeTeam: "HOMETEAM",
  homeTeamLeaguePoints: 3,
  league: "TESTLEAGUE",
  round: "TESTROUND",
  scoreDifference: 16,
  winner: "HOMETEAM"
}

var testPick1 = {
  _id: "PICKID",
  awayScore: 1,
  competition: "TESTCOMPID",
  fixture: "TESTFIXID",
  homeScore: 2,
  round: "TESTROUNDID",
  user: "TESTUSERID",
  winner: "HOMETEAM",
  scoreDifference: 10,
  pickcomment: "correctTeam under picked (1)"
}

var testPick2 = {
  _id: "PICKID",
  awayScore: 1,
  competition: "TESTCOMPID",
  fixture: "TESTFIXID",
  homeScore: 2,
  round: "TESTROUNDID",
  user: "TESTUSERID",
  winner: "HOMETEAM",
  scoreDifference: -1,
  pickcomment: "correctTeam over picked (1)"
}

var testPick2a = {
  _id: "PICKID",
  awayScore: 1,
  competition: "TESTCOMPID",
  fixture: "TESTFIXID",
  homeScore: 2,
  round: "TESTROUNDID",
  user: "TESTUSERID",
  winner: "HOMETEAM",
  scoreDifference: -1,
  pickcomment: "correctTeam over picked wrong but chose 30+ (1)"
}


var testPick3 = {
  _id: "PICKID",
  awayScore: 1,
  competition: "TESTCOMPID",
  fixture: "TESTFIXID",
  homeScore: 2,
  round: "TESTROUNDID",
  user: "TESTUSERID",
  winner: "AWAYTEAM",
  scoreDifference: 30,
  pickcomment: "wrongTeam over picked (0)"
}

var testPick4 = {
  _id: "PICKID",
  awayScore: 1,
  competition: "TESTCOMPID",
  fixture: "TESTFIXID",
  homeScore: 2,
  round: "TESTROUNDID",
  user: "TESTUSERID",
  winner: "AWAYTEAM",
  scoreDifference: 10,
  pickcomment: "wrongTeam under picked (0)"
}

var testPick5 = {
  _id: "PICKID",
  awayScore: 1,
  competition: "TESTCOMPID",
  fixture: "TESTFIXID",
  homeScore: 2,
  round: "TESTROUNDID",
  user: "TESTUSERID",
  winner: "HOMETEAM",
  scoreDifference: -1,
  pickcomment: "correcTeam correctPick (2)"
}

var testPick6 = {
  _id: "PICKID",
  awayScore: 1,
  competition: "TESTCOMPID",
  fixture: "TESTFIXID",
  homeScore: 2,
  round: "TESTROUNDID",
  user: "TESTUSERID",
  winner: "DRAW",
  scoreDifference: 20,
  pickcomment: "wrongTeam correct Pick (1)"
}


function removeCummulativeData(){
    var Point = require('../app/models/point');
    Point.find({$or: [{type:'event'},{type:'round'}]}).exec(function(err,points){
        points.forEach(function (point){
            /**point.pointsHistory = undefined;
            point.cummulativePoints = undefined;
            point.cummulativePointsHistory = undefined;
            point.historyTitles = undefined;
            point.save(); **/
            console.log('type:%s, ph:%s, cummulativePoints: %s', point.type, point.pointsHistory, point.cummulativePointsHistory)
        });
    });
}



// connect to the database

var mongoose = require('mongoose');
var dbUrl = 'mongodb://'+process.env.DATABASE_USER+':'+process.env.DATABASE_PASSWORD+'@'+process.env.DATABASE_SERVER+':'+process.env.DATABASE_PORT+'/'+process.env.DATABASE_NAME;
mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback(){

  
   //updateScoreForFixtureList(['549dbc89f1ace29007e4bff7','549dbc89f1ace29007e4bfec','549dbc89f1ace29007e4c011']);//
  updateCummulativeRoundPoints("542a5f2392bef71ffb812bcb"); // a league
  
   // TEST SCORING OPTION
/**   console.log(testPick1.pickcomment + " : "+fixtureScoring(testPick1,testFixture,testCompetition));
   console.log(testPick2.pickcomment + " : "+fixtureScoring(testPick2,testFixture,testCompetition));
    console.log(testPick2a.pickcomment + " : "+fixtureScoring(testPick2a,testFixture,testCompetition));
    console.log(testPick3.pickcomment + " : "+fixtureScoring(testPick3,testFixture,testCompetition));
    console.log(testPick4.pickcomment + " : "+fixtureScoring(testPick4,testFixture,testCompetition));
    console.log(testPick5.pickcomment + " : "+fixtureScoring(testPick5,testFixture,testCompetition)); 
**/
    //removeCummulativeData();
    console.log("done");

    
});

