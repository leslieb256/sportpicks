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

mongoose.connect('mongodb://golog:gogogadget@kahana.mongohq.com:10088/tipping2');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback(){
    //updateUsers('mathew.bialy@wcc.govt.nz',"Matt B");
    //updateUserPassword('mathew.bialy@wcc.govt.nz',"password");    
    //addUserToComp('54ae4e92da48880c5f1cdcb4','mathew.bialy@wcc.govt.nz');

    //checkUser('5401512fb918a6b661d42b78');
    console.log("done");
});