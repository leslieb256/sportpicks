var mongoose = require('mongoose');

// Function to convert time to corret timezones.
function convertTime(time,inZone,outZone){
    var moment = require('moment-timezone');
    console.log("ORIGTIME: %s",time);
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


//update League
function updateLeagues(){
    var League = require('./app/models/league');
    League.update({name:'Super Rugby'},
        {$set:{
            sponsor:'Investec'
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
    League.findOne({name:"Super Rugby"}, function (err, league) {
        if (err) console.log("ERROR:"+err.toString());
        else {
            Event.update({name:'2015 Season'},
                {$set: {league: league._id}},
                {upsert:true},
                function (err){
                    if (err) console.log("Event update Error:"+err.toString());
                }                
            );
        }
    });
}

// update TEAMS
function updateTeams(){
    console.log('updating teams');
    var Team = require('./app/models/team');    
    var League = require('./app/models/league');    

    League.findOne({name:"Super Rugby"}, function (err, league) {
        Team.update({name: 'Brumbies'},{$set: {shtname:'Brumbies', shtcode:'BRM',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Melbourne Rebels'},{$set: {shtname:'Rebels', shtcode:'REB',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'New South Wales Waratahs'},{$set: {shtname:'Waratahs', shtcode:'WAR',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Queensland Reds'},{$set: {shtname:'Reds', shtcode:'RED',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Western Force'},{$set: {shtname:'Force', shtcode:'FOR',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Blues'},{$set: {shtname:'Blues', shtcode:'BLU',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Chiefs'},{$set: {shtname:'Chiefs', shtcode:'CHF',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Crusaders'},{$set: {shtname:'Crusaders', shtcode:'CRU',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Highlanders'},{$set: {shtname:'Highlanders', shtcode:'HLR',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Hurricanes'},{$set: {shtname:'Hurricanes', shtcode:'HUR',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Bulls'},{$set: {shtname:'Bulls', shtcode:'BUL',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Central Cheetahs'},{$set: {shtname:'Cheetahs', shtcode:'CTH',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Lions'},{$set: {shtname:'Lions', shtcode:'LNS',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Sharks'},{$set: {shtname:'Sharks', shtcode:'SHK',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
        Team.update({name: 'Stormers'},{$set: {shtname:'Stormers', shtcode:'STM',league:league}},{upsert:true}, function(err){if (err) console.log("Team update Error:"+err.toString())});
    });   
}

//update ROUNDS
function updateRounds(leagueName, eventName){
    var League = require('./app/models/league');
    var Event = require('./app/models/event');
    var Round = require('./app/models/round');
    console.log('updating rounds');
    var roundList = [
        {name:'Round 1',type: 'fixture', roundPosition: 1, firstFixture: "2015-02-13 19:35", lastFixture: "2015-02-16 18:05", ffTimeZone: "Pacific/Auckland"},
    ];
    
    NEED TO EDIT BELWO TP ADD LASTDFIX DATE TO DATABASE
    
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



mongoose.connect('mongodb://golog:gogogadget@kahana.mongohq.com:10088/tipping2');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback(){
    updateLeagues();
    //updateEvent();
    //updateTeams();
    console.log("done");
});