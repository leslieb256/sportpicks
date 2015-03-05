// creates statistics for the fixture results
// See statistics.js model for more information

function storeCompetitionFixtureStatistics(fixtureID, competitionID){
    var FixturePick = require('../models/fixturePick');
    var Fixture = require('../models/fixture');
    var Competition = require('../models/competition');
    var Statistic = require('../models/statistic');
    var async = require('async');

// See http://stackoverflow.com/questions/23667086/why-is-my-variable-unaltered-after-i-modify-it-inside-of-a-function-asynchron might need to make a call back?
    
    Competition.findById(competitionID).exec(function(err, competition){
        if (err) {console.log('Error - problem with finding comp ID in statistics')}
        else {
            Fixture.findById(fixtureID).exec(function (err, fixture){
                if (err) {console.log('Error with finding the fixture for statistics calc')}
                else {
                    var statsData = [];
                    
                    // NEED TO DO AN ASYNC SERIES FOR EACH. THEN IT WILL GO THROUGH EACH ONE WHICH MEANS YOU CAN DOA CALLBACK AT THE END OF EACH TO ENSURE STATS IS UPDATED.
                    // MAYBE TRY JUST THE ASYNC FORACH IF THIS WORKS
                    
                    async.series([
                        function(db_write_cb){
                            // here I use async.foreachseries to make sure we finish with all the
                            // scoring options before we pass it to the db write part
                            async.forEachSeries(competition.scoring, function(scoringOption, collection_cb){
                                if(scoringOption.type=='winner'){
                                    FixturePick.aggregate([
                                        {$match:{ fixture:fixture._id, competition:competition._id }},
                                    	{$group: {_id:"$winner", count:{$sum:1}} }
                                    ], function(err, result){
                                        console.log('in te result function');
                                    	if(err){
                                    	    console.log('ERROR: %s',err)
                                    	    collection_cb(err);
                                    	}
                                    	else {
                                    	    var formattedData = [];
                                    	    console.log('formatting winner data for return');
                                    	    formatWinnerPickNumberResult(result,function(formattedData){
                                                statsData.push(formattedData);
                                                collection_cb();
                                    	    });
                               	            //result.forEach(function (pickSummary){
                                            //    formattedData.push({'teamID':pickSummary._id, 'number':pickSummary.count});
                                            //});
                                    	}
                                    });
                                }
                                if (scoringOption.type=='scoreDifference'){
                                    console.log('looking at scoreDifference stats');
                                    FixturePick.aggregate([
                                        {$match:{fixture:fixture._id, competition:competition._id}},
                                        {$group:{_id:{winner:'$winner', scoreDifference:'$scoreDifference'}, count:{$sum:1} }} 
                                    ], function(err, result){
                                        console.log('inscore diff result function');
                                        if (err) {console.log('ERROR in scoredifference stats calc')}
                                        else {
                                            statsData.push(result);
                                            collection_cb();
                                        }
                                    });
                                }
                            }, function(err){
                                    if (err){console.log(err)}
                                    else {
                                        db_write_cb(); // callback to write stats data to the DB;
                                    }
                                
                            });

                        },
                        function (db_write_cb){
                            console.log('sAVING STATS DATA HERE');
                            console.log(statsData);
                        },

                    ]);
/**             
                    competition.scoring.forEach( function(scoringOption){
                        console.log(scoringOption);
                       if (scoringOption.type=='winner'){
                           console.log('in winner stat');
                            FixturePick.aggregate([
                                {$match:{ fixture:fixture._id, competition:competition._id }},
                            	{$group: {_id:"$winner", count:{$sum:1}} }
                            ], function(err, result){
                                console.log('in te result function');
                            	if(err){console.log('ERROR: %s',err)}
                            	else {
                            	    console.log('before formatting data');
                                    formatWinnerPickNumberResult(result, function(formattedData){
                                        console.log('formatted data:');
                                        console.log(formattedData);
                            			Statistic.update({
                            				 fixture: fixture._id,
                            				 competition: competition._id},
                            				 {$set: {type: 'winnerPickNumber', data:formattedData}},
                            				 {upsert: true},
                            				 function(err){
                            				 	if(err){console.log('Error on adding stats data to mongo');}
                            				 	else {console.log('Statistics data stored.')}
                            				 }); 
                                    });
                            	}
                            });


                        }
                    });
**/
                }
            });
        }
    });

    function retreiveFixtureDataForCompWinner(competition, fixture, scoringOption){
        FixturePick.aggregate([
            {$match:{ fixture:fixture._id, competition:competition._id }},
        	{$group: {_id:"$winner", count:{$sum:1}} }
        ], function(err, result){
            console.log('in te result function');
        	if(err){
        	    console.log('ERROR: %s',err)
        	    return(undefined);
        	}
        	else {
        	    var formattedData = [];
        	    console.log('formatting winner data for return');
   	            result.forEach(function (pickSummary){
                    formattedData.push({'teamID':pickSummary._id, 'number':pickSummary.count});
                });
                return formattedData;
        	}
        });

    }
    
    function formatWinnerPickNumberResult(resultData,callback){
        var formattedData = [];
        resultData.forEach(function (pickSummary){
            formattedData.push({'teamID':pickSummary._id, 'number':pickSummary.count});
        });
        
        callback(formattedData);
    }
    
    function retrieveFixCompStatsCjsFormat(competitionID, fixtureID, callback){
        
        // this function should be a call back functin, in the call back it returns the data in the right format for chartJS to use to draw teh graph
        // needs to get all competition data as a fixed, not object thing go through each and create a new data object blob in CJS format
        // callback with the data blob
        // then you can have the page build get the called back data object to use in crating the page.
        
        
    }

/**
//DATAFORMAT FOR DONUT CHART
var data = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    }
]
**/
    

    // TEAM FIXTURE STATISTICS LAST 5 games result and last up to 5 games vs that team result.

    
}

var mongoose = require('mongoose');
var dbUrl = 'mongodb://'+process.env.DATABASE_USER+':'+process.env.DATABASE_PASSWORD+'@'+process.env.DATABASE_SERVER+':'+process.env.DATABASE_PORT+'/'+process.env.DATABASE_NAME;
mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback(){
    console.log('starting');

   storeCompetitionFixtureStatistics('54af2d35f1ace29007e4c0ec', '54ae4e92da48880c5f1cdcb4');

    console.log("done");

    
});

