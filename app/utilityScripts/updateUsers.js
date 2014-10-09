var mongoose = require('mongoose');
var User = require('../models/user');

// update users
function updateUsers(){
    User.update({local:{email:'ryan'}},
        {$set: {
            local:{email:'ryan',password:'test'}
        }},{upsert: true},
        function (err){
            if (err) console.log("user update Error:"+err.toString());
        }
    );
}

function updateUserPassword(userId, newPassword){
    User.findById(userId).exec(function (err, user){
        //var newUser = new User();
        console.log('%s', user.local.email);
        console.log('%s',user.generateHash(newPassword));
        user.local.password = user.generateHash(newPassword);
        user.save();
    });
}

function checkUser(userId){
    User.findById(userId).exec(function(competitionList){
        console.log(competitionList);
    });
}

mongoose.connect('mongodb://golog:gogogadget@kahana.mongohq.com:10088/tipping2');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback(){
    //updateUsers();
    updateUserPassword('543497522367c9209a739163','test');
    //checkUser('5401512fb918a6b661d42b78');
    console.log("done");
});