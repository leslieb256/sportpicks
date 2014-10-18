var mongoose = require('mongoose');
var User = require('../models/user');
var Competition = require('../models/competition');
var Team = require('../models/team');
var FixturePick = require('../models/fixturePick');

function updatePicks(user_email, comp_name){
    var picks = [
        // ROUND 1 Picks
        {user: user_email, 
        competition: comp_name, 
        fixture: '5434a4cc2367c9209a73916e', // CCM WPX
        winner: 'CCM',
        homeScore: 2,
        awayScore: 0
        },

        {user: user_email, 
        competition: comp_name, 
        fixture: '5434a4cc2367c9209a73916f', // MCY NUJ
        winner: 'MCY',
        homeScore: 3,
        awayScore: 2
        },

        {user: user_email, 
        competition: comp_name, 
        fixture: '5434a4cc2367c9209a739170', //ADU MBV
        winner: 'MBV',
        homeScore: 0,
        awayScore: 2
        },

        {user: user_email, 
        competition: comp_name, 
        fixture: '5434a4cc2367c9209a739171', // PTH BBR
        winner: 'BBR',
        homeScore: 1,
        awayScore: 3

        },

        {user: user_email, 
        competition: comp_name, 
        fixture: '5434a4cc2367c9209a739172', // SFC WSW
        winner: 'WSW',
        homeScore: 1,
        awayScore: 2
        }
    ];
    
    picks.forEach(function(pick){
        User.findOne({'local.email': user_email}, function (err, user) {
            if (err) console.log("ERROR:"+err.toString());
            else{
                Competition.findOne({'name': comp_name}, function (err, competition) {
                if (err) console.log("ERROR:"+err.toString());
                else{
    
                        Team.findOne({'shtcode': pick.winner}, function (err, winner) {
                            if (err) console.log("ERROR:"+err.toString());
                            else{
                                console.log('WINNER %s', winner.name);
                                FixturePick.update({
                                    user: user._id, 
                                    competition: competition._id, 
                                    fixture: pick.fixture}, 
                                    {$set: {winner: winner._id, homeScore: pick.homeScore, awayScore:pick.awayScore}},
                                    {upsert: true},
                                    function(err){
                                        if (err) console.log("ERROR2:"+err.toString());
                                    }
                                );

                            }
                        });
                    }
                });
            }
        });
    });

    
}


mongoose.connect('mongodb://golog:gogogadget@kahana.mongohq.com:10088/tipping2');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback(){
    updatePicks('darcy@araitanga.com', 'Roseneath School');
    console.log("done");
});