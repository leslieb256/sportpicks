// creates statistics for the fixture results
// See statistics.js model for more information

function storeCompetitionFixtureStatistics(fixtureID, competitionID){
    var FixturePick = require('./models/fixturePick');
    var Fixture = require('./models/fixture');
    var Competition = require('./models/competition');
    var Statistic = require('./models/statistic');
    var Team = require('./models/team');
    var async = require('async');
    
    var HOMERGB = "190, 95, 124";
    var AWAYRGB = "187, 205, 103";
    var DRAWRGB = "220,220,220";

// See http://stackoverflow.com/questions/23667086/why-is-my-variable-unaltered-after-i-modify-it-inside-of-a-function-asynchron might need to make a call back?
    
    Competition.findById(competitionID).exec(function(err, competition){
        if (err) {console.log('Error - problem with finding comp ID in statistics')}
        else {
            Fixture.findById(fixtureID).populate('homeTeam awayTeam').exec(function (err, fixture){
                if (err) {console.log('Error with finding the fixture for statistics calc')}
                else {
                    Team.find({league:competition.league}).exec(function (err, compTeams){
                        if (err){console.log('error finding teams')}
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
                                                //console.log('in te result function');
                                            	if(err){
                                            	    console.log('ERROR: %s',err)
                                            	    collection_cb(err);
                                            	}
                                            	else {
                                            	    formatWinnerPickNumberResult(result, createIdLookup(compTeams), fixture,  function(formattedData){
                                                	    //console.log('formatting winner data for return');
                                                        statsData.push(formattedData);
                                                        //console.log(formattedData);
                                                        collection_cb();
                                            	    })
                                            	}
                                            });
                                        }
                                        if (scoringOption.type=='scoreDifference'){
                                            //console.log('looking at scoreDifference stats');
                                            // should have a test, if winner required as if winner not required the split between the teams is lss important
                                            FixturePick.aggregate([
                                                {$match:{fixture:fixture._id, competition:competition._id}},
                                                {$group:{_id:{winner:'$winner', scoreDifference:'$scoreDifference'}, count:{$sum:1} }} 
                                            ], function(err, result){
                                                //console.log('inscore diff result function');
                                                if (err) {console.log('ERROR in scoredifference stats calc')}
                                                else {
                                                    formatScoreDiffNumberResult(result, createIdLookup(compTeams), fixture, scoringOption, function(formattedData){
                                                        statsData.push(formattedData);
                                                        collection_cb();
                                                    })
                                                }
                                            });
                                        }
                                        
                                        if(scoringOption.type=='exactResult'){
                                            // This is about the mix of the selected scores, the winner is not important for the graph.
                                            FixturePick.find({fixture:fixture._id, competition: competition._id}).exec(function (err, fixturePicks){
                                                if (err){console.log(err)}
                                                else{
                                                    formatExactResultNumber(fixturePicks,fixture, function(formattedData){
                                                        //console.log('========FORMATTED DATA ========');
                                                        //console.log(JSON.stringify(formattedData));
                                                        statsData.push(formattedData);                                                        
                                                        collection_cb();
                                                    });
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
                                    console.log('======STATS DATA======');
                                    console.log(JSON.stringify(statsData));
                        			Statistic.update({
                        				 fixture: fixture._id,
                        				 competition: competition._id},
                        				 {$set: {data: statsData}},
                        				 {upsert: true},
                        				 function(err){
                        				 	if(err){console.log('Error on adding stats data to mongo');}
                        				 	else {console.log('Statistics data stored.')}
                        				 }); 
                                },
        
                            ]);
                        }
                    });
                }
            });
        }
    });
    
    function formatExactResultNumber (fixturePicks, fixture, callback){
        console.log('in foramt Exact Result');
        // create the structure for our formatted data.
        var formattedData = {
            'type':'exactResult',
            'data':{
                'labels': [],
                'datasets':[
                    {   label: fixture.homeTeam.name,
                        fillColor: "rgba("+HOMERGB+",0.5)",
                        strokeColor: "rgba("+HOMERGB+",0.8)",
                        highlightFill: "rgba("+HOMERGB+",0.5)",
                        highlightStroke: "rgba("+HOMERGB+",1)",
                        pointColor : "rgba("+HOMERGB+",0.8)",                
                        pointStrokeColor : "rgba("+HOMERGB+",0.8)",                
                        data: []                        
                    },
                    {   label: fixture.awayTeam.name,
                        fillColor: "rgba("+AWAYRGB+",0.5)",
                        strokeColor: "rgba("+AWAYRGB+",0.8)",
                        highlightFill: "rgba("+AWAYRGB+",0.5)",
                        highlightStroke: "rgba("+AWAYRGB+",1)",
                        pointColor : "rgba("+AWAYRGB+",0.8)",
                        pointStrokeColor : "rgba("+AWAYRGB+",0.8)",                
                        data: []
                    }
                ]
            }
        };

        uniquePickValues(fixturePicks, function(uniqueValues){
            
            formattedData.data['labels'] = uniqueValues;
            
            var numberOfOptions = uniqueValues.length;
            formattedData.data.datasets[0].data = new Array(numberOfOptions);
            formattedData.data.datasets[1].data = new Array(numberOfOptions);
    		for (var i=0;i<numberOfOptions;i++){formattedData.data.datasets[0].data[i] = 0;}
    		for (var i=0;i<numberOfOptions;i++){formattedData.data.datasets[1].data[i] = 0;}

            fixturePicks.forEach(function(pick){
                //find where the score pick is in the relvent dataset and add one to the entry
                var positionHS = uniqueValues.indexOf(pick.homeScore);
                formattedData.data.datasets[0].data[positionHS] += 1;

                var positionAS = uniqueValues.indexOf(pick.awayScore);
                formattedData.data.datasets[1].data[positionAS] += 1;
            });

            callback (formattedData);
        });

        function uniquePickValues (fixturePicks, callback){
            console.log('identifying unique values');
            // function that iterates through a set of picks and 
            // idenfities the unique values
            var uniqueValues = [];            
            fixturePicks.forEach(function(pick){
                if (uniqueValues.indexOf(pick.homeScore)==-1) {
                    uniqueValues.push(pick.homeScore);
                }
                if (uniqueValues.indexOf(pick.awayScore)==-1) {
                    uniqueValues.push(pick.awayScore);
                }
            });
            uniqueValues.sort();
            callback(uniqueValues);
        }
        
    }
    
    function formatWinnerPickNumberResult(resultData,teamLookup, fixture,  callback){
        // formats picks statistics in to format for database for storing the stats
        var formattedData = {'type':'winnerPickNumber', data:[]};
        resultData.forEach(function (pickSummary){
            if (fixture.homeTeam.id == pickSummary._id){
                formattedData.data.push({'value':pickSummary.count, 'color':"rgba(190, 95, 124,0.5)", 'highlight':"rgba(190, 95, 124,0.8)", 'label':teamLookup[pickSummary._id].name});                
            }
            else {
                if (fixture.awayTeam.id == pickSummary._id){
                    formattedData.data.push({'value':pickSummary.count, 'color':"rgba(187, 205, 103,0.5)", 'highlight':"rgba(187, 205, 103,0.8)", 'label':teamLookup[pickSummary._id].name});                
                }
                else {
                    formattedData.data.push({'value':pickSummary.count, 'color':"rgba(220,220,220,0.5)", 'highlight':"rgba(220,220,220,0.8)", 'label':teamLookup[pickSummary._id].name});                
                }
            }
        });
        
        callback(formattedData);
    }
    
    function formatScoreDiffNumberResult(resultData, teamLookup, fixture, scoringOption, callback){
        // formats the the data for scoredifferences to display in a bargraph
        // assumes the compeititon is set to require a winner before you get points for the score difference
        var formattedData = {type:'scoreDifferencePickNumber', data:{}};
        formattedData.data.labels = [];
        
        // prepare the labels
        if (scoringOption.margins[0] == 0){
            formattedData.data.labels.push('0');
        }
		for (var i=1; i < scoringOption.margins.length; i++) {
		    if ( scoringOption.margins[i-1]+1 == scoringOption.margins[i]) {
		        formattedData.data.labels.push (scoringOption.margins[i]);
		    } 
		    else { 
		        formattedData.data.labels.push (scoringOption.margins[i-1] + 1 +'-'+scoringOption.margins[i]);
		    }
		}
		if (scoringOption.selectOver){
		    formattedData.data.labels.push (scoringOption.margins[scoringOption.margins.length - 1 ] + 1+"+");		    
		}
		
		// collate the dataset data
		// basically we cycle through the db query result
		// first we test for whether it was home/away /draw selected
		// then witin that we work out what position the scoredifference selection sits in the [home|away|draw]selections array
		// prefilled with zeros.
		var numberOfOptions = scoringOption.margins.length;
		if (scoringOption.selectOver) {numberOfOptions += 1 ;}
		var homeSelections = new Array(numberOfOptions);
		var awaySelections = new Array(numberOfOptions);
		var drawSelections = new Array(numberOfOptions);
		for (i=0;i<numberOfOptions;i++){homeSelections[i] = 0;}
		for (i=0;i<numberOfOptions;i++){awaySelections[i] = 0;}
		for (i=0;i<numberOfOptions;i++){drawSelections[i] = 0;}

        resultData.forEach(function (result){
            if (result._id.winner == fixture.homeTeam.id){
                if (result._id.scoreDifference==-1){
                    homeSelections[homeSelections.length - 1] = result.count;
                }
                else {
                    homeSelections[scoringOption.margins.indexOf(result._id.scoreDifference)] = result.count;                    
                }

            }
            else {
                if(result._id.winner == fixture.awayTeam.id){
                    if (result._id.scoreDifference==-1){
                        awaySelections[homeSelections.length - 1] = result.count;
                    }
                    else {
                        awaySelections[scoringOption.margins.indexOf(result._id.scoreDifference)] = result.count;
                    }
                    
                }
                else {
                    if (result._id.scoreDifference==-1){
                        drawSelections[homeSelections.length - 1] = result.count;
                    }
                    else {
                        drawSelections[scoringOption.margins.indexOf(result._id.scoreDifference)] = result.count;
                    }
                    
                }
            }
        });	

        // fill the datasets based on the user selection summary above
        //console.log('building sd data');
        formattedData.data.datasets = [
            {   label: fixture.homeTeam.name,
                fillColor: "rgba(190, 95, 124,0.5)",
                strokeColor: "rgba(190, 95, 124,0.8)",
                highlightFill: "rgba(190, 95, 124,0.5)",
                highlightStroke: "rgba(190, 95, 124,1)",
                pointColor : "rgba(190, 95, 124,0.8)",                
                pointStrokeColor : "rgba(190, 95, 124,0.8)",                
                data: homeSelections
            },
            {   label: fixture.awayTeam.name,
                fillColor: "rgba(187, 205, 103,0.5)",
                strokeColor: "rgba(187, 205, 103,0.8)",
                highlightFill: "rgba(187, 205, 103,0.5)",
                highlightStroke: "rgba(187, 205, 103,1)",
                pointColor : "rgba(187, 205, 103,0.8)",
                pointStrokeColor : "rgba(187, 205, 103,0.8)",                
                data: awaySelections
            },
            {   label: 'Draw',
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.5)",
                highlightStroke: "rgba(220,220,220,0.8)",
                pointColor : "rgba(220,220,220,0.8)",                                                
                pointStrokeColor : "rgba(220,220,220,0.8)",
                data: drawSelections
            }
        
        ]

        callback(formattedData);
    }

}

function createIdLookup(queryData){
	//console.log('ALL RANK DATA:\n%s',queryData);
	var lookup = {};
	for (var i = 0; i<queryData.length; i++){
		lookup[queryData[i].id] = queryData[i];
	}
	return lookup;
}

//==================
// EXPORTS =========
//==================
exports.storeCompetitionFixtureStatistics = storeCompetitionFixtureStatistics;

    // TEAM FIXTURE STATISTICS LAST 5 games result and last up to 5 games vs that team result.


var mongoose = require('mongoose');
var dbUrl = 'mongodb://'+process.env.DATABASE_USER+':'+process.env.DATABASE_PASSWORD+'@'+process.env.DATABASE_SERVER+':'+process.env.DATABASE_PORT+'/'+process.env.DATABASE_NAME;
mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback(){
    console.log('starting');

   storeCompetitionFixtureStatistics('542c9ae12367c9209a739150', '542a5ffa736e3e35532f2d24');

    console.log("done");

    
});

