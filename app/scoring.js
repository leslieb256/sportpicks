/**
 * SCORING MODULE
 * holds all of the scoring functions so they can be edited/reviewed in one place.
 * These functions all return a number which is the points the user has earned from that pick
 **/
 
function soccerFixtureScoring(userPick, fixtureResult, scoringOptions){
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
        
    });
    
    return totalPoints;
}


exports.soccerFixtureScoring= soccerFixtureScoring;
