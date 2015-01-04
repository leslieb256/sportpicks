// app/routes.js
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs', {successMsg: req.flash('successMsg'),
								 dangerMsg: req.flash('dangerMsg')}); // load the index.ejs file
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
		failureRedirect : '/', // redirect back to the index/login page if there is an error
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

/**
 * REMOVE SIGN UP
	// process the signup form
    // process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
**/

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
		var League = require('../app/models/league');
		var Event = require('../app/models/event');
		
		Competition.find({usersAccepted:req.user.id}).populate('event league').exec( function(err,comps) {
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
	// ROUNDS ==============================
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
						Round.find({event:comp.event}).sort('roundPosition').lean().exec(function(err,rounds){
							if (err){console.log('ERR: round page on rounds')}
							else {
								Point.find({competition:comp.id, type:'event'}).sort('ranking').populate('user').lean().exec(function(err,rank){
									if (err){console.log('ERR: round page on rank')}
									else{
										Point.find({competition:comp.id, type:'round', user:req.user.id}).exec(function(err,points){
											if (err){console.log('ERR: round page on points')}
											else{
												//console.log(rank);
												//console.log(createCompetitionLookup(rank));
												res.render('rounds.ejs', {
													user : req.user, // get the user out of session and pass to template
													rounds: rounds,
													competition: comp,
													points: createRoundLookup(points),
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
			}
		});
	});

	// =====================================
	// FIXTURES ============================
	// =====================================
	// Gets the fixture details for the competition
	app.get('/fixtures', isLoggedIn, function(req, res) {
		var Point = require('../app/models/point');
		var Fixture = require('../app/models/fixture');
		var Round = require('../app/models/round');
		var Competition = require('../app/models/competition');
		var FixturePick =require('../app/models/fixturePick');
		var Team = require('../app/models/team'); //needed for the populate for fixtures.
		var User = require('../app/models/user');		//needed for the populate for users
		//console.log('FIXTURES: PARAM REQ:',req.param);
		
		Fixture.find({round:req.param('round')}).populate('homeTeam awayTeam').sort('closeDate').lean().exec(function (err,fixtures){
		if (err) {console.log('ERR: fixtures page on fixtures')}
			else{
				FixturePick.find({competition:req.param('competition'), round:req.param('round'), user:req.user.id}).exec(function(err,picks){
					console.log('FIXTURES LIST\n');
					console.log(fixtures);
					Competition.findById(req.param('competition')).exec(function(err,comp){
						//console.log('FIXTURES: comp:%s',comp)
						Round.findById(req.param('round')).exec(function(err, round){
							Point.find({competition:comp.id, type:'round',round:round.id}).sort('ranking').populate('user').exec(function(err,rank){
								Point.find({competition:comp.id, type:'fixture', user:req.user.id, round:round.id}).exec(function(err,points){
									res.render('fixtures.ejs', {
										user : req.user, // get the user out of session and pass to template
										fixtures: fixtures,
										picks: createFixtureLookup(picks),
										competition: comp,
										round: round,
										rankings: rank,
										points: createFixtureLookup(points),
										successMsg: req.flash('successMsg'),
										dangerMsg: req.flash('dangerMsg'),
									});
								});
							})
						});
					});
							
							
				});
			}
		});
	});
	
	app.get('/fixturePick', isLoggedIn, function(req, res) {
		var Fixture = require('../app/models/fixture');
		var FixturePick =require('../app/models/fixturePick');
		var Team = require('../app/models/team'); //needed for the populate for fixtures.
		var Round =require('../app/models/round');
		var Competition =require('../app/models/competition');
		var Point =require('../app/models/point');
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
								FixturePick.findOne({competition:req.param('competition'), fixture:req.param('fixture'), user:req.user.id}).exec(function(err,pick){
									if (err) {console.log('ERR: fixtures page on picks')}
									else {
										Round.findById(fixture.round, function (err,round){
											if (err) {console.log('ERR: fixtures page on picks')}
											else {
												Competition.findById(req.param('competition')).exec(function(err, comp){
													if (err) {console.log('ERR: fixtures pick page on COMP lookup')}
													else{
														Point.findOne({user:req.user.id, competition:comp.id, fixture:fixture.id}).exec(function (err, points){
															if (err) {console.log('ERR: fixtures pick page on COMP lookup')}
															else {
																res.render('fixturePick.ejs', {
																	user : req.user, // get the user out of session and pass to template
																	fixture: fixture,
																	pick: pick,
																	teams: createIdLookup(teams),
																	draw: draw,
																	round: round,
																	competition: comp,
																	points: points
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
					}				
				});
			}
		});

	});

	app.post('/submitPick', isLoggedIn, function(req, res) {
		var FixturePick =require('../app/models/fixturePick');
		//console.log(req.body)
		
		// CANR USE PICK ID HERE MUST USE COMP< USER AND FIXTURE TO CREATE IT AS 
		//THERE MAY NOT BE A PICK MADE YET!
		//console.log('FIXTURES: PARAM REQ:',req.body);
        FixturePick.update({
            user: req.user.id,
        	fixture: req.body.fixtureId,
            round: req.body.roundId,
            competition: req.body.competitionId},
            {$set: {winner:req.body.winner, homeScore: req.body.homeScore, awayScore:req.body.awayScore}},
            {upsert: true},
            function(err){
                if (err) {console.log("ERROR:"+err.toString());req.flash('dangerMsg','Pick not saved');}
                else {req.flash('successMsg', 'Pick recorded');}
                //console.log('SUBMITPICK: compID; %s',req.body.competitionId);
				res.redirect('fixtures?competition='+req.body.competitionId+'&round='+req.body.roundId);
            }
        );
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
