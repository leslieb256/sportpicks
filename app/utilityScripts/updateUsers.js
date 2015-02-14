var mongoose = require('mongoose');
var User = require('../models/user');

// update users
function updateUsers(email, displayname){
    User.update({local:{email:email}},
        {$set: {
            local:{email:email},
            displayName: displayname
        }},{upsert: true},
        function (err){
            if (err) console.log("user update Error:"+err.toString());
        }
    );
}

function updateUserPassword(email, newPassword){
    User.findOne({'local.email':email}).exec(function (err, user){
        if (err){console.log(err)}
        else {
            //var newUser = new User();
            console.log('%s', user.local.email);
            console.log('%s',user.generateHash(newPassword));
            user.local.password = user.generateHash(newPassword);
            user.save();
        }
    });
}

function checkUser(userId){
    User.findById(userId).exec(function(competitionList){
        console.log(competitionList);
    });
}

function addUserToComp(competitionId, email){
    var Competition = require('../models/competition');
    var User = require('../models/user');
    Competition.findById(competitionId).exec(function (err, comp){
        if (err){ console.log(err);}
        else {
            User.findOne({'local.email':email}).exec(function (err, user){
               if (err) {console.log(err)}
               else {
                   comp.usersAccepted.push(user._id);
                   comp.save();
               }
            });
        }
    });
}

function removeAllUserRecords(userId,competitionId){
    // removes user points from comp
    // removes user picks from comp
    // removes user from comp
    var User = require('../models/user');
    var Point = require('../models/point');
    var FixturePick = require('../models/fixturePick');    
    var Competition = require('../models/competition');        
    
    User.findById(userId).exec(function (err, user){
        if(err){console.log('ERROR:%s',err)}
        else {
            // remove record of user points
            Point.find({user:user, competition:competitionId}).remove().exec(function(err, points){
                if(err){console.log('ERROR:%s',err)}
                else {
                    console.log('points for user %s (%s) removed',user.name, user.id);
                }
            });                
            // remove record of user picks
            FixturePick.find({user:user, competition:competitionId}).remove().exec(function(err, picks){
                if(err){console.log('ERROR:%s',err)}
                else {
                    console.log('picks for user %s (%s) removed',user.name, user.id);
                }                
            });
            
        }
    });
    
    
}

var dbUrl = 'mongodb://'+process.env.DATABASE_USER+':'+process.env.DATABASE_PASSWORD+'@'+process.env.DATABASE_SERVER+':'+process.env.DATABASE_PORT+'/'+process.env.DATABASE_NAME;
mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback(){
    //updateUsers('mathew.bialy@wcc.govt.nz',"Matt B");
    //updateUserPassword('mathew.bialy@wcc.govt.nz',"password");    
    //addUserToComp('54ae4e92da48880c5f1cdcb4','mathew.bialy@wcc.govt.nz');

    //checkUser('5401512fb918a6b661d42b78');
    removeAllUserRecords('5413f5114e06b040143dbbac','54ae4e92da48880c5f1cdcb4');
    console.log("done");
});