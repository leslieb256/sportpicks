/**
 * SCORING MODULE
 * holds all of the scoring functions so they can be edited/reviewed in one place.
 * These functions all return a number which is the points the user has earned from that pick
 **/
 
function fixtureScoring(userPick, fixtureResult, scoringOptions){
    //set fixture points to zero
    var totalPoints = 0;
    console.log("inSCORING");
    
    // leter need to make it look for fixture type first.
    //if match then do the below else needs to apply correct scoring for
    // goldenboot or evetnwinner
    scoringOptions.forEach(function(scoringOption){
        if (scoringOption.type == "winner"){
            //console.log("PICK:%s | ACTUAL: %s | TRUE?:%s", userPick.winner, fixtureResult.winner,( String(userPick.winner)==String(fixtureResult.winner) ) );
            if (String(userPick.winner)==String(fixtureResult.winner)){
                totalPoints += scoringOption.points;
                //console.log("Winner so 7 points:%s", totalPoints);
            }
        }
        
        if ((scoringOption.type == "scoreDifference")&&(userPick.scoreDifference == fixtureResult.scoreDifference)&&(String(userPick.winner)==String(fixtureResult.winner)) ){
            {
                totalPoints += scoringOption.points;
                //console.log("USER: %s, FIXTURE: %s, GD so +3 points:%s", userPick.scoreDifference, fixtureResult.scoreDifference,totalPoints);
            }
        }
        
        if ( scoringOption.type == "exactResult" ){
            if (String(userPick.winner)==String(fixtureResult.winner)) { 
                if ( (scoringOption.points - (Math.abs(userPick.homeScore - fixtureResult.homeScore)*scoringOption.lossMultiplier) 
                                          - (Math.abs(userPick.awayScore - fixtureResult.awayScore)*scoringOption.lossMultiplier) ) >0 ) {
                    totalPoints += scoringOption.points - (Math.abs(userPick.homeScore - fixtureResult.homeScore)*scoringOption.lossMultiplier) 
                                          - (Math.abs(userPick.awayScore - fixtureResult.awayScore)*scoringOption.lossMultiplier);
                }
                //console.log("USER: %s, FIXTURE: %s, GD so +3 points:%s", userPick.scoreDifference, fixtureResult.scoreDifference,totalPoints);
            }
        }
        
    });
    
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
                // updateCompetitionFixtureRanking(fixture),
                // updateCompetitionRoundRanking(fixture),
                // updateCompetitionEventRanking(fixture),
            ], function(err){
                if (err){console.log('ERROR on scoreUpdate for fixture: %s',fixtureId)}
            }); 
        }
    });
}

function scoreFixture(fixture){
    /**
     * Takes a fixture object and calcuates the score for each user who has a pick for that fixture.
     **/
    var PickFixture = require('../app/models/soccerPickFixture');
    var Point = require('../app/models/point');
    PickFixture.find({fixture:fixture._id}).exec(function(err,picks){
       //console.log('PICKS\n%s',picks);
       picks.forEach(function(userPick){
            console.log("PICKS\n%s",userPick);
            console.log('FIXTURE\nfixture:%s', fixture);
            console.log('\n=====================\n');
            // calc winning score and update db if score is not zero

            var pickPoints = fixtureScoring(userPick, fixture, [{type:"winner", points:1},{type:"exactResult", points:1, lossMultiplier:1}]);
            console.log('points = %s', pickPoints);
            

/**
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
                    else {
                        console.log("FIXTURE SCORED");
                    }
                }
            );
**/
    
       });
    });
}


	// =====================================
	// EXECUTABLE PART FOR TESTING =========
	// =====================================
	// Scores a single fixture and updates the rankings for
	// competition and round and fixture.

// connect to the database

var mongoose = require('mongoose');
mongoose.connect('mongodb://golog:gogogadget@kahana.mongohq.com:10088/tipping2');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback(){

   // TEST UPDATE SCORE
   updateScoreByFixtureId('542c9ae12367c9209a739150');

    console.log("done");
    
});