// creates statistics for the fixture results
// See statistics.js model for more information

function competitionFixtureStatistics(fixtureID, competitionID){
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
                        var statData = [];
                        async.each(competition.scoring, function(scoringOption, callback){
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
                                	    console.log('before formatting data')
                                        formatWinnerPickNumberResult(result, function(formattedData){
                                            console.log('formatted data:')
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
                            callback();
    
                            
                        },function(err, result){
                            if(err){console.log('Error on adding stats data to mongo');}
                            else {
                                console.log('statsdata all done');
                            }
                        });
                }
            });
        }
    });

/**
                            	else{
                            	    console.log(formatWinnerPickNumberResult(result));
                            	    var statData = {}
                    				Statistic.update({
                    				 fixture: fixture._id,
                    				 competition: competition._id,
                    				 type:'winnerPickNumber'},
                    				 {$set: {data:formatWinnerPickNumberResult(result)}},
                    				 {upsert: true},
                    				 function(err){
                    				 	if(err){console.log('Error on adding stats data to mongo');}
                    				 	else {console.log('Statistics data stored.')}
                    				 }
                    				);
                            	}

**/
    

function formatWinnerPickNumberResult(resultData,callback){
    var formattedData = [];
    resultData.forEach(function (pickSummary){
        formattedData.push({'teamID':pickSummary._id, 'number':pickSummary.count});
    });
    
    callback(formattedData);
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

   competitionFixtureStatistics('542c9ae12367c9209a739150', '542a5ffa736e3e35532f2d24');
/**   var Statistic = require('../models/statistic');
    var Fixture = require('../models/fixture');        
    		Statistic.findOne({fixture:'542c9ae12367c9209a739150', competition:'542a5ffa736e3e35532f2d24'}).populate('fixture').exec(function (err,statData){
    		    console.log(statData);
    		    //statData.data.forEach(function (test){
    		    //  console.log(test)  ;
    		    //})
    		    
    		});
**/
    console.log("done");

    
});

