// TODO: Addcountry Flag
// Load players for 2013/14 season.
// load roudns, fixtures and scores and goals for 2013/14 season
// then ook at picks.

// This script connects to the mongo database at Cloud9 using mongoskin
// You will have to manaully go in to mongo and create the db: tippingcomp

//setup host varaibles for database
var port = process.env.PORT;
var host = process.env.IP;
var dbname = 'offpool';

// This line assumes no authentication
var mongoose = require('mongoose');
var models= require('./models');

// connect to the database
mongoose.connect('mongodb://golog:gogogadget@kahana.mongohq.com:10061/tippingcomptest');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback(){
    // load players by team
    /**Team.findOne({shtcode:"ADU"}, function (err, team) {
        if (err) console.log("ERROR:"+err.toString());
        else {
            Player.create({name:'Eugene Galekovic', currentTeam: team._id});
            Player.create({name:'Michale Marron', currentTeam: team._id});
            Player.create({name:'Nigel Boogaard', currentTeam: team._id});
            Player.create({name:'Jonathan McKain', currentTeam: team._id});
            Player.create({name:'Osama Malik', currentTeam: team._id});
            Player.create({name:'Cassio Oliveira', currentTeam: team._id});
            Player.create({name:'Jeronimo Morales Neumann', currentTeam: team._id});
            Player.create({name:'Isaias Sanchez', currentTeam: team._id});
            Player.create({name:'Sergio Cirio', currentTeam: team._id});
            Player.create({name:'Marcelo Carrusca', currentTeam: team._id});
            Player.create({name:'Bruce Djite', currentTeam: team._id});
            Player.create({name:'Cameron Watson', currentTeam: team._id});
            Player.create({name:'Jacob Melling', currentTeam: team._id});
            Player.create({name:'Daniel Bowles', currentTeam: team._id});
            Player.create({name:'Awer Mabil', currentTeam: team._id});
            Player.create({name:'Michael Zullo', currentTeam: team._id});
            Player.create({name:'Jake Barker-Daish', currentTeam: team._id});
            Player.create({name:'Paul Izzo', currentTeam: team._id});
            Player.create({name:'Tarek Elrich', currentTeam: team._id});
            Player.create({name:'Fabio Ferreria', currentTeam: team._id});
            Player.create({name:'Jordan Elsey', currentTeam: team._id});
            Player.create({name:'Brent McGrath', currentTeam: team._id});
            Player.create({name:'Ryan Kitto', currentTeam: team._id});
            Player.create({name:'Teeboy Kamara', currentTeam: team._id});
        }
    } ); 

        Team.findOne({shtcode:"BBR"}, function (err, team) {
        if (err) console.log("ERROR:"+err.toString());
        else {
            Player.create({name:'Michael Theo', currentTeam: team._id});
            Player.create({name:'Matt Smith', currentTeam: team._id});
            Player.create({name:'Shane Stefanutti', currentTeam: team._id});
            Player.create({name:'Daniel Bowles', currentTeam: team._id});
            Player.create({name:'Ivan Franjic', currentTeam: team._id});
            Player.create({name:'Mensur Kurtisi', currentTeam: team._id});
            Player.create({name:'Steven Lustica', currentTeam: team._id});
            Player.create({name:'Kofi Danning', currentTeam: team._id});
            Player.create({name:'Henrique Silva', currentTeam: team._id});
            Player.create({name:'Liam Miller', currentTeam: team._id});
            Player.create({name:'Jade North', currentTeam: team._id});
            Player.create({name:'James Donachie', currentTeam: team._id});
            Player.create({name:'Jean Carlos Solorzano', currentTeam: team._id});
            Player.create({name:'Matt McKay', currentTeam: team._id});
            Player.create({name:'Luke Brattan', currentTeam: team._id});
            Player.create({name:'Jack Hingert', currentTeam: team._id});
            Player.create({name:'Jamie Young', currentTeam: team._id});
            Player.create({name:'Thomas Broich', currentTeam: team._id});
            Player.create({name:'Dimitri Petratos', currentTeam: team._id});
            Player.create({name:'George Lambadaridis', currentTeam: team._id});
            Player.create({name:'Corey Brown', currentTeam: team._id});
            Player.create({name:'Deveante Clut', currentTeam: team._id});
            Player.create({name:'Brandon Borrello', currentTeam: team._id});
            Player.create({name:'Ben Litfin', currentTeam: team._id});
            Player.create({name:'Fraser Chalmers', currentTeam: team._id});
            Player.create({name:'Patrick Theodore', currentTeam: team._id});
            Player.create({name:'Jai Ingham', currentTeam: team._id});
        }
    } ); 

    Team.findOne({shtcode:"CCM"}, function (err, team) {
        if (err) console.log("ERROR:"+err.toString());
        else {
            Player.create({name:'Justin Pasfield', currentTeam: team._id});
            Player.create({name:'Joshua Rose', currentTeam: team._id});
            Player.create({name:'Marcel Seip', currentTeam: team._id});
            Player.create({name:'Zachary Anderson', currentTeam: team._id});
            Player.create({name:'Brent Griffiths', currentTeam: team._id});
            Player.create({name:'John Hutchinson ', currentTeam: team._id});
            Player.create({name:'Nick Montgomery', currentTeam: team._id});
            Player.create({name:'Mitchell Duke', currentTeam: team._id});
            Player.create({name:'Marcos Flores', currentTeam: team._id});
            Player.create({name:'Nicholas Fitzgerald', currentTeam: team._id});
            Player.create({name:'Liam Reddy', currentTeam: team._id});
            Player.create({name:'Hayden Morton', currentTeam: team._id});
            Player.create({name:'Storm Roux', currentTeam: team._id});
            Player.create({name:'Anthony Cáceres', currentTeam: team._id});
            Player.create({name:'Michael Neill', currentTeam: team._id});
            Player.create({name:'Matt Simon', currentTeam: team._id});
            Player.create({name:'Bernie Ibini-Isei', currentTeam: team._id});
            Player.create({name:'Mile Sterjovski', currentTeam: team._id});
            Player.create({name:'Tom Slater', currentTeam: team._id});
            Player.create({name:'Adam Kwasnik', currentTeam: team._id});
            Player.create({name:'Jesse Curran', currentTeam: team._id});
            Player.create({name:'Eddy Bosnar', currentTeam: team._id});
            Player.create({name:'Kim Seung-Yong', currentTeam: team._id});
            Player.create({name:'Isaka Cernak', currentTeam: team._id});
            Player.create({name:'Glen Trifiro', currentTeam: team._id});
            Player.create({name:'Matt Sim', currentTeam: team._id});
            Player.create({name:'Joshua Bingham', currentTeam: team._id});
            Player.create({name:'John Crawley', currentTeam: team._id});
        }
    } );
    
      Team.findOne({shtcode:"MCY"}, function (err, team) {
        if (err) console.log("ERROR:"+err.toString());
        else {
            Player.create({name:'Clint Bolton', currentTeam: team._id});
            Player.create({name:'Michael Marrone', currentTeam: team._id});
            Player.create({name:'Cameron Edwards', currentTeam: team._id});
            Player.create({name:'Simon Colosimo', currentTeam: team._id});
            Player.create({name:'Fred Carrerio', currentTeam: team._id});
            Player.create({name:'Patrick Gerhardt', currentTeam: team._id});
            Player.create({name:'Matt Thompson', currentTeam: team._id});
            Player.create({name:'Dylan Macallister', currentTeam: team._id});
            Player.create({name:'Josip Tadic', currentTeam: team._id});
            Player.create({name:'Richard Garcia', currentTeam: team._id});
            Player.create({name:'Jonatan Germano', currentTeam: team._id});
            Player.create({name:'Golgol Mebrahtu', currentTeam: team._id});
            Player.create({name:'David Williams', currentTeam: team._id});
            Player.create({name:'Aziz Behich', currentTeam: team._id});
            Player.create({name:'Marcel Meeuwis', currentTeam: team._id});
            Player.create({name:'Jason Hoffman', currentTeam: team._id});
            Player.create({name:'David Vrankovic', currentTeam: team._id});
            Player.create({name:'Ben Garuccio', currentTeam: team._id});
            Player.create({name:'Andrew Redmayne', currentTeam: team._id});
            Player.create({name:'Steven Gray', currentTeam: team._id});
            Player.create({name:'Jamie Coyne', currentTeam: team._id});
            Player.create({name:'Nick Kalmar', currentTeam: team._id});
            Player.create({name:'Mate Dugandzic', currentTeam: team._id});
            Player.create({name:'Sam Mitchinson', currentTeam: team._id});
            Player.create({name:'Jeremy Walker', currentTeam: team._id});
            Player.create({name:'Ersin Kaya', currentTeam: team._id});
            Player.create({name:'Stefan Mauk', currentTeam: team._id});
            Player.create({name:'Vince Grella', currentTeam: team._id});
            Player.create({name:'Eli Babalj', currentTeam: team._id});

        }
    } );
       
         Team.findOne({shtcode:"MBV"}, function (err, team) {
        if (err) console.log("ERROR:"+err.toString());
        else {
            Player.create({name:'Nathan Coe', currentTeam: team._id});
            Player.create({name:'Pablo Contreras', currentTeam: team._id});
            Player.create({name:'Adama Traore', currentTeam: team._id});
            Player.create({name:'Nick Ansell', currentTeam: team._id});
            Player.create({name:'Mark Milligan', currentTeam: team._id});
            Player.create({name:'Leigh Broxham', currentTeam: team._id});
            Player.create({name:'Guilherme Finkler', currentTeam: team._id});
            Player.create({name:'Kosta Barbarouses', currentTeam: team._id});
            Player.create({name:'Archie Thompson', currentTeam: team._id});
            Player.create({name:'Connor Pain', currentTeam: team._id});
            Player.create({name:'Andrew Nabbout', currentTeam: team._id});
            Player.create({name:'Rashid Mahazi', currentTeam: team._id});
            Player.create({name:'James Jeggo', currentTeam: team._id});
            Player.create({name:'Francesco Stella', currentTeam: team._id});
            Player.create({name:'Lawrence Thomas', currentTeam: team._id});
            Player.create({name:'Tom Rogic', currentTeam: team._id});
            Player.create({name:'Jesse Makarounas', currentTeam: team._id});
            Player.create({name:'Adrian Leijer', currentTeam: team._id});
            Player.create({name:'Scott Galloway', currentTeam: team._id});
            Player.create({name:'Jason Geria', currentTeam: team._id});
            Player.create({name:'Jordan Brown', currentTeam: team._id});
            Player.create({name:'Christopher Cristaldo', currentTeam: team._id});
            Player.create({name:'Dylan Murnane', currentTeam: team._id});
            Player.create({name:'James Troisi', currentTeam: team._id});
        }
    } );
    
         Team.findOne({shtcode:"NUJ"}, function (err, team) {
        if (err) console.log("ERROR:"+err.toString());
        else {
            Player.create({name:'Mark Birighitti', currentTeam: team._id});
            Player.create({name:'Scott Neville', currentTeam: team._id});
            Player.create({name:'Taylor Regan', currentTeam: team._id});
            Player.create({name:'Kew Jaliens', currentTeam: team._id});
            Player.create({name:'Ben Kantarovski', currentTeam: team._id});
            Player.create({name:'Zenon Caravella', currentTeam: team._id});
            Player.create({name:'Andrew Hoole', currentTeam: team._id});
            Player.create({name:'Ruben Zadkovich', currentTeam: team._id});
            Player.create({name:'Emile Heskey', currentTeam: team._id});
            Player.create({name:'Craig Goodwin', currentTeam: team._id});
            Player.create({name:'Connor Chapman', currentTeam: team._id});
            Player.create({name:'Joey Gibbs', currentTeam: team._id});
            Player.create({name:'Josh Mitchell', currentTeam: team._id});
            Player.create({name:'Joshua Brillante', currentTeam: team._id});
            Player.create({name:'Jacob Pepper', currentTeam: team._id});
            Player.create({name:'James Virgili', currentTeam: team._id});
            Player.create({name:'James Brown', currentTeam: team._id});
            Player.create({name:'Michael Bridges', currentTeam: team._id});
            Player.create({name:'Ben Kennedy', currentTeam: team._id});
            Player.create({name:'Sam Gallaway', currentTeam: team._id});
            Player.create({name:'Adam Taggart', currentTeam: team._id});
            Player.create({name:'David Carney', currentTeam: team._id});
            Player.create({name:'Mitchell Oxborrow ', currentTeam: team._id});
            Player.create({name:'Mitch Cooper', currentTeam: team._id});
            Player.create({name:'Nick Ward', currentTeam: team._id});
            Player.create({name:'Joel Griffiths', currentTeam: team._id});
            Player.create({name:'John Solari ', currentTeam: team._id});
            Player.create({name:'Brandon Lundy ', currentTeam: team._id});
        }
    } );
    
         Team.findOne({shtcode:"PTH"}, function (err, team) {
        if (err) console.log("ERROR:"+err.toString());
        else {
            Player.create({name:'Jack Clisby', currentTeam: team._id});
            Player.create({name:'Brandon O\'Neill', currentTeam: team._id});
            Player.create({name:'Ryan Edwards', currentTeam: team._id});
            Player.create({name:'Rostyn Griffiths', currentTeam: team._id});
            Player.create({name:'Cameron Edwards', currentTeam: team._id});
            Player.create({name:'Jacob Burns', currentTeam: team._id});
            Player.create({name:'Nebojsa Marinkovic', currentTeam: team._id});
            Player.create({name:'Shane Smeltz', currentTeam: team._id});
            Player.create({name:'Jamie Maclaren', currentTeam: team._id});
            Player.create({name:'Adrian Zahra', currentTeam: team._id});
            Player.create({name:'Travis Dodd', currentTeam: team._id});
            Player.create({name:'Steven McGarry', currentTeam: team._id});
            Player.create({name:'Chris Harold', currentTeam: team._id});
            Player.create({name:'Sidnei Sciola', currentTeam: team._id});
            Player.create({name:'Jack Duncan', currentTeam: team._id});
            Player.create({name:'Joshua Risdon', currentTeam: team._id});
            Player.create({name:'Daniel De Silva', currentTeam: team._id});
            Player.create({name:'Scott Jamieson', currentTeam: team._id});
            Player.create({name:'Michael Thwaite', currentTeam: team._id});
            Player.create({name:'Matthew Davies', currentTeam: team._id});
            Player.create({name:'Riley Woodcock', currentTeam: team._id});
            Player.create({name:'Harry O\'Brien', currentTeam: team._id});
            Player.create({name:'Dean Evans', currentTeam: team._id});
            Player.create({name:'Darvydas Sernas', currentTeam: team._id});
            Player.create({name:'Devon Spence', currentTeam: team._id});
            Player.create({name:'William Gallas', currentTeam: team._id});
            Player.create({name:'Luke Radonich', currentTeam: team._id});
           
        }
    } );
    
             Team.findOne({shtcode:"SFC"}, function (err, team) {
        if (err) console.log("ERROR:"+err.toString());
        else {
            Player.create({name:'Vedran Janjetovic', currentTeam: team._id});
            Player.create({name:'Sebastian Ryall', currentTeam: team._id});
            Player.create({name:'Marc Warren', currentTeam: team._id});
            Player.create({name:'Ranko Despotovic', currentTeam: team._id});
            Player.create({name:'Matthew Jurman', currentTeam: team._id});
            Player.create({name:'Nikola Petkovic', currentTeam: team._id});
            Player.create({name:'Pedj Bojic', currentTeam: team._id});
            Player.create({name:'Corey Gameiro', currentTeam: team._id});
            Player.create({name:'Alessandro Del Piero', currentTeam: team._id});
            Player.create({name:'Richard Garcia', currentTeam: team._id});
            Player.create({name:'Blake Powell', currentTeam: team._id});
            Player.create({name:'Sasa Ognenovski', currentTeam: team._id});
            Player.create({name:'Mitchell Mallia ', currentTeam: team._id});
            Player.create({name:'Terry McFlynn', currentTeam: team._id});
            Player.create({name:'Joel Chianese', currentTeam: team._id});
            Player.create({name:'Terry Antonis', currentTeam: team._id});
            Player.create({name:'Peter Triantis', currentTeam: team._id});
            Player.create({name:'Nick Carle', currentTeam: team._id});
            Player.create({name:'Vedran Janjetovic', currentTeam: team._id});
            Player.create({name:'Milos Dimitrijevic', currentTeam: team._id});
            Player.create({name:'Ali Abbas', currentTeam: team._id});
            Player.create({name:'Rhyan Grant', currentTeam: team._id});
            Player.create({name:'Hagi Gligor', currentTeam: team._id});
            Player.create({name:'Daniel Petkovski ', currentTeam: team._id});
            Player.create({name:'Chris Naumoff', currentTeam: team._id});
            Player.create({name:'Matt Thompson', currentTeam: team._id});
          }
    } );

             Team.findOne({shtcode:"WSW"}, function (err, team) {
        if (err) console.log("ERROR:"+err.toString());
        else {
            Player.create({name:'Ante Covic', currentTeam: team._id});
            Player.create({name:'Shannon Cole', currentTeam: team._id});
            Player.create({name:'Adam D\'Apuzzo', currentTeam: team._id});
            Player.create({name:'Nikolai Topor-Stanley', currentTeam: team._id});
            Player.create({name:'Michael Beauchamp', currentTeam: team._id});
            Player.create({name:'Jerome Polenz', currentTeam: team._id});
            Player.create({name:'Labinot Haliti', currentTeam: team._id});
            Player.create({name:'Mateo Poljak', currentTeam: team._id});
            Player.create({name:'Tomi Juric', currentTeam: team._id});
            Player.create({name:'Aaron Mooy', currentTeam: team._id});
            Player.create({name:'Brendon Santalab', currentTeam: team._id});
            Player.create({name:'Tahj Minniecon', currentTeam: team._id});
            Player.create({name:'Matthew Spiranovic', currentTeam: team._id});
            Player.create({name:'Kwabena Appiah', currentTeam: team._id});
            Player.create({name:'Yianni Perkatis', currentTeam: team._id});
            Player.create({name:'Josh Barresi', currentTeam: team._id});
            Player.create({name:'Youssouf Hersi', currentTeam: team._id});
            Player.create({name:'Iacopo La Rocca', currentTeam: team._id});
            Player.create({name:'Mark Bridge', currentTeam: team._id});
            Player.create({name:'Jerrad Tyson', currentTeam: team._id});
            Player.create({name:'Shinji Ono', currentTeam: team._id});
            Player.create({name:'Dean Heffernan', currentTeam: team._id});
            Player.create({name:'Jason Trifiro', currentTeam: team._id});
            Player.create({name:'Daniel Mullen', currentTeam: team._id});
            Player.create({name:'Golgol Mebrahtu', currentTeam: team._id});
            Player.create({name:'Antony Golec', currentTeam: team._id});
        }
    } );


             Team.findOne({shtcode:"WPX"}, function (err, team) {
        if (err) console.log("ERROR:"+err.toString());
        else {
            Player.create({name:'Glen Moss', currentTeam: team._id});
            Player.create({name:'Manny Muscat', currentTeam: team._id});
            Player.create({name:'Reece Caira', currentTeam: team._id});
            Player.create({name:'Luke Adams', currentTeam: team._id});
            Player.create({name:'Michael Boxall', currentTeam: team._id});
            Player.create({name:'Josh Brindell-South', currentTeam: team._id});
            Player.create({name:'Leo Bertos', currentTeam: team._id});
            Player.create({name:'Paul Ifill', currentTeam: team._id});
            Player.create({name:'Kenny Cunningham', currentTeam: team._id});
            Player.create({name:'Stein Huysegems', currentTeam: team._id});
            Player.create({name:'Jeremy Brockie', currentTeam: team._id});
            Player.create({name:'Tyler Boyd', currentTeam: team._id});
            Player.create({name:'Albert Riera', currentTeam: team._id});
            Player.create({name:'Alex Rufer', currentTeam: team._id});
            Player.create({name:'Jason Hicks', currentTeam: team._id});
            Player.create({name:'Louis Fenton', currentTeam: team._id});
            Player.create({name:'Vince Lia', currentTeam: team._id});
            Player.create({name:'Ben Sigmund', currentTeam: team._id});
            Player.create({name:'Hamish Watson', currentTeam: team._id});
            Player.create({name:'Lewis Italiano', currentTeam: team._id});
            Player.create({name:'Carlos Hernandez', currentTeam: team._id});
            Player.create({name:'Andrew Durante', currentTeam: team._id});
            Player.create({name:'Matthew Ridenton', currentTeam: team._id});
            Player.create({name:'Roy Krishna', currentTeam: team._id});
            Player.create({name:'Shaun Timmins', currentTeam: team._id});
            Player.create({name:'Milos Lujic', currentTeam: team._id});
            Player.create({name:'Jacob Spoonley', currentTeam: team._id});
            Player.create({name:'James McPeake', currentTeam: team._id});
        }
    } );
**/
    
} );

    console.log("complete")
    
    //load players
    
    

