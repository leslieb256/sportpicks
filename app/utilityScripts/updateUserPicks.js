var mongoose = require('mongoose');
var User = require('../models/user');
var Competition = require('../models/competition');
var Team = require('../models/team');
var FixturePick = require('../models/fixturePick');
var Fixture = require('../models/fixture');

function updatePicks(user_email, comp_name){
    var picks = [
        {user: user_email, competition: comp_name, fixture: '549dbc89f1ace29007e4c01d', winner: 'CCM', homeScore:0 ,awayScore: 1        },
        {user: user_email, competition: comp_name, fixture: '549dbc89f1ace29007e4c003', winner: 'MCY', homeScore:1 ,awayScore: 2        },
        {user: user_email, competition: comp_name, fixture: '549dbc89f1ace29007e4c007', winner: 'SFC', homeScore:1 ,awayScore:  0       },
        {user: user_email, competition: comp_name, fixture: '549dbc89f1ace29007e4c01f', winner: 'WPX', homeScore: 2,awayScore: 0        },
        {user: user_email, competition: comp_name, fixture: '549dbc89f1ace29007e4c01b', winner: 'PTH', homeScore: 0,awayScore: 3        },

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
                                Fixture.findById(pick.fixture).exec(function(err, fixture){
                                    if (err) console.log('ERROR:%s',err);
                                    else{
                                        console.log('WINNER %s', winner.name);
                                       // console.log(fixture.round);
                                        FixturePick.update({
                                            user: user._id, 
                                            competition: competition._id, 
                                            fixture: pick.fixture}, 
                                            {$set: {round:fixture.round, winner: winner._id, homeScore: pick.homeScore, awayScore:pick.awayScore}},
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
            }
        });
    });

    
}

function showallPicksforUserForROund(user_email,round_id){
    var FixturePick = require('../models/fixturePick');
    var User = require('../models/user');
    
    User.findOne({'local.email':user_email}).exec(function(err,user){
        if (err){console.log('ERROR:%s',err)}
        else{
           FixturePick.find({user:user.id,round:round_id}).exec(function(err,picks){
            if (err){console.log('ERROR:%s',err)}
            else{
                  picks.forEach(function(pick){
                    console.log('PICK\n=============');
                    console.log(pick);
                    console.log('==============');
                  });
            }
           });
        }
    });
    
    
}

//var dbUrl = 'mongodb://'+process.env.DATABASE_USER+':'+process.env.DATABASE_PASSWORD+'@'+process.env.DATABASE_SERVER+':'+process.env.DATABASE_PORT+'/'+process.env.DATABASE_NAME;
var dbUrl = 'mongodb://'+process.env.DATABASE_USER+':'+process.env.DATABASE_PASSWORD+'@dogen.mongohq.com:10055/tippingComp';
mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback(){
    updatePicks('darcy@araitanga.com', 'Roseneath School');
    //showallPicksforUserForROund('darcy@araitanga.com','542bd1842367c9209a739134')
    console.log("done");
});