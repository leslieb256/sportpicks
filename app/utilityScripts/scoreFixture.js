/**
 * SCORING MODULE
 * holds all of the scoring functions so they can be edited/reviewed in one place.
 * These functions all return a number which is the points the user has earned from that pick
 **/
 
function fixtureScoring(userPick, fixtureResult, scoringOptions){
    //set fixture points to zero
    var totalPoints = 0;
    console.log("inSCORING");
    
    // later need to make it look for fixture type first, then it can go through and apply each scoring option, eg: if fixcture type is:eventwinner it can juo to anther section as
    // these are all match, just give it a bit of a tree to work through.
    // later need to make it so that you can choose whtehr the winner needs to be picked corectly before the scoring option kicks in.

    scoringOptions.forEach(function(scoringOption){
        if (scoringOption.type == "winner"){
            //console.log("PICK:%s | ACTUAL: %s | TRUE?:%s", userPick.winner, fixtureResult.winner,( String(userPick.winner)==String(fixtureResult.winner) ) );
            if (String(userPick.winner)==String(fixtureResult.winner)){
                totalPoints += scoringOption.points;
            }
        }
        
        if ((scoringOption.type == "scoreDifference")&&(userPick.scoreDifference == fixtureResult.scoreDifference)&&(String(userPick.winner)==String(fixtureResult.winner)) ){
            {
                totalPoints += scoringOption.points;
                //console.log("USER: %s, FIXTURE: %s, GD so +3 points:%s", userPick.scoreDifference, fixtureResult.scoreDifference,totalPoints);
            }
        }
        if ((scoringOption.type == "exactResult")&&(String(userPick.winner)==String(fixtureResult.winner)) ){
            {
        //exact result should let you specit a movmtn option, eg for every x points left or gith then it changes the points by y.
                totalPoints += scoringOption.points;
                //console.log("USER: %s, FIXTURE: %s, GD so +3 points:%s", userPick.scoreDifference, fixtureResult.scoreDifference,totalPoints);
            }
        }

    });
    
    return totalPoints;
}

exports.FixtureScoring = fixtureScoring;