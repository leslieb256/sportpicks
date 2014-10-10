// app/routes.js
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') }); 
	});

	// process the login form
    // process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/competitions', // redirect to the compeitions list
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));


	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
    // process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		//console.log('%s',req.user);
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	// =====================================
	// COMPETITIONS ========================
	// =====================================
	// shows the competitions the user is registered with
	app.get('/competitions', isLoggedIn, function(req, res) {
		var Competition = require('../app/models/competition');
		Competition.userCompetitions(req.user.id, function (err,comps){
		if (err) {console.log('ERR: compeitions page on comps')}
			else{
				Competition.userRanking(req.user.id, function(err, rank){
					if (err) {console.log('ERR: compeitions page on rank')}
					else {
						//console.log(rank);
						//console.log(createCompetitionLookup(rank));
						res.render('competitions.ejs', {
							user : req.user, // get the user out of session and pass to template
							competitions: comps,
							rankings: createCompetitionLookup(rank)
							});
					}
				});
			}
		});
	});
	
	// =====================================
	// ROUNDS ========================
	// =====================================
	// Gets the round details for the competition
	app.get('/rounds', isLoggedIn, function(req, res) {
		var Competition = require('../app/models/competition');
		var Round = require('../app/models/round');
		var Point = require('../app/models/point');
		var User = require('../app/models/user');		
		Competition.findById(req.param('competition'), function (err,comp){
		if (err) {console.log('ERR: rounds page on comps')}
			else{
				Round.userRanking(req.user.id, function(err, rank){
					if (err) {console.log('ERR: round page on rank')}
					else {
						Round.find({event:comp.event}).sort('roundPosition').exec(function(err,rounds){
							if (err){console.log('ERR: round page on rounds')}
							else {
								Point.find({competition:comp.id, type:'event'}).sort('ranking').populate('user').exec(function(err,rank){
									if (err){console.log('ERR: round page on rank')}
									else{
										//console.log(rank);
										//console.log(createCompetitionLookup(rank));
										res.render('rounds.ejs', {
											user : req.user, // get the user out of session and pass to template
											rounds: rounds,
											competition: comp,
											rankings:rank
										});
									}
								});
								
								
							}
						});
							
					}
				});
			}
		});
	});

	// =====================================
	// FIXTURES ========================
	// =====================================
	// Gets the round details for the competition
	app.get('/fixtures', isLoggedIn, function(req, res) {
		var Fixture = require('../app/models/fixture');
		var Round = require('../app/models/round');
		var Competition = require('../app/models/competition');
		var soccerPickFixture =require('../app/models/soccerPickFixture');
		var Team = require('../app/models/team'); //needed for the populate for fixtures.

		Fixture.find({round:req.param('round')}).populate('homeTeam awayTeam').sort('date').exec(function (err,fixtures){
		if (err) {console.log('ERR: fixtures page on fixtures')}
			else{
				soccerPickFixture.find({competition:req.param('competition'), round:req.param('round'), user:req.user.id}).exec(function(err,picks){
					Competition.findById(req.param('competition')).exec(function(err,comp){
						Round.findById(req.param('round')).exec(function(err, round){
									res.render('fixtures.ejs', {
										user : req.user, // get the user out of session and pass to template
										fixtures: fixtures,
										picks: createFixtureLookup(picks),
										competition: comp,
										round: round,
										successMsg: req.flash('successMsg'),
										dangerMsg: req.flash('dangerMsg'),
									});
						});
					});
							
							
				});
			}
		});
	});
	
	app.get('/fixturePick', isLoggedIn, function(req, res) {
		var Fixture = require('../app/models/fixture');
		var soccerPickFixture =require('../app/models/soccerPickFixture');
		var Team = require('../app/models/team'); //needed for the populate for fixtures.
		var Round =require('../app/models/round');
		var Competition =require('../app/models/competition');
		Fixture.findById(req.param('fixture')).exec(function (err,fixture){
		if (err) {console.log('ERR: fixturePick page on fixtures')}
			else{
				//console.log('FIXTURE:%s',fixture);
				Team.find({}).exec(function (err,teams){
				if (err) {console.log('ERR: fixtures page on teams')}
					else{				
						Team.findOne({name:'Draw'}).exec(function (err,draw){
							if (err) {console.log('ERR: fixtures page on fixtures')}
							else{				
								soccerPickFixture.findOne({competition:req.param('competition'), fixture:req.param('fixture'), user:req.user.id}).exec(function(err,pick){
									if (err) {console.log('ERR: fixtures page on picks')}
									else {
										Round.findById(fixture.round, function (err,round){
											if (err) {console.log('ERR: fixtures page on picks')}
											else {
												Competition.findById(req.param('competition')).exec(function(err, comp){
													res.render('fixturePick.ejs', {
														user : req.user, // get the user out of session and pass to template
														fixture: fixture,
														pick: pick,
														teams: createIdLookup(teams),
														draw: draw,
														round: round,
														competition: comp,
													});
												});
											}
										});
									}
								});
							}
						});
					}				
				});
			}
		});

	});

	app.post('/submitPick', isLoggedIn, function(req, res) {
		var soccerPickFixture =require('../app/models/soccerPickFixture');
		console.log(req.body)
		
		// CANR USE PICK ID HERE MUST USE COMP< USER AND FIXTURE TO CREATE IT AS 
		//THERE MAY NOT BE A PICK MADE YET!

        soccerPickFixture.update({
            user: req.user.id,
        	fixture: req.body.fixtureId,
            round: req.body.roundId,
            competition: req.body.competitionId},
            {$set: {winner:req.body.winner, homeScore: req.body.homeScore, awayScore:req.body.awayScore}},
            {upsert: true},
            function(err){
                if (err) {console.log("ERROR:"+err.toString());req.flash('dangerMsg','Pick not saved');}
                else {req.flash('successMsg', 'Pick recorded');}
				res.redirect('fixtures?competition='+req.body.competitionId+'&round='+req.body.roundId);
            }
        );



		soccerPickFixture.findByIdAndUpdate(req.body.pickId, {round: req.body.roundId, 
			competition:req.body.competitionId, fixture:req.body.fixtureId, 
			winner:req.body.winner, homeScore: req.body.homeScore, awayScore:req.body.awayScore},
			{upsert: true}).exec(function(err,updated){
				if (err) {console.log(err)}
				else{
				}
			});
	});
	


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

function createCompetitionLookup(queryData){
	var lookup = {};
	//console.log('DataLength:%s',queryData.length);
	//console.log('ALL RANK DATA:\n%s',queryData);
	//console.log('QUERYDATA:0\n%s',queryData[0]);
	//console.log('QUERYDATA:0\n%s',queryData[1]);
	for (var i = 0; i<queryData.length; i++){
		//console.log('QUERYDATA %s',i);
		//console.log(queryData[i]);
		//console.log(queryData[i]);
		lookup[queryData[i].competition] = queryData[i];
	}
	return lookup;
}

function createRoundLookup(queryData){
	//console.log('ALL RANK DATA:\n%s',queryData);
	var lookup = {};
	for (var i = 0; i<queryData.length; i++){
		lookup[queryData[i].round] = queryData[i];
	}
	return lookup;
}

function createFixtureLookup(queryData){
	//console.log('ALL RANK DATA:\n%s',queryData);
	var lookup = {};
	for (var i = 0; i<queryData.length; i++){
		lookup[queryData[i].fixture] = queryData[i];
	}
	return lookup;
}

function createIdLookup(queryData){
	//console.log('ALL RANK DATA:\n%s',queryData);
	var lookup = {};
	for (var i = 0; i<queryData.length; i++){
		lookup[queryData[i].id] = queryData[i];
	}
	return lookup;
}

function localiseTime(utcTime,localTimezone){
    var moment = require('moment-timezone');
    var origTime =moment.tz(utcTime,"UTC");
    var localTime = origTime.clone().tz(localTimezone);
    return localTime;
}

function localiseCloseDate(data,localTimezone){
	//relies on the data having a "closeDate" 
	//uses moment-timezone timezone descriptions.
	//converts dates in closeDate to users set local time.
	data.closeDate = localiseTime(data.closeDate,localTimezone);
	return data;
}


function localiseCloseDates(data,localTimezone){
	//relies on the data having a "closeDate" 
	//uses moment-timezone timezone descriptions.
	//converts dates in closeDate to users set local time.
	data.forEach(function (item){
		item.closeDateLocalTime == localiseTime(item.closeDate,localTimezone);
	});
	return data;
}
