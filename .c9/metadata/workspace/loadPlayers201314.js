{"filter":false,"title":"loadPlayers201314.js","tooltip":"/loadPlayers201314.js","undoManager":{"mark":71,"position":71,"stack":[[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":11,"column":14},"end":{"row":11,"column":25}},"text":"tippingcomp"},{"action":"insertText","range":{"start":{"row":11,"column":14},"end":{"row":11,"column":15}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":11,"column":15},"end":{"row":11,"column":16}},"text":"f"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":11,"column":16},"end":{"row":11,"column":17}},"text":"f"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":11,"column":17},"end":{"row":11,"column":18}},"text":"p"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":11,"column":18},"end":{"row":11,"column":19}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":11,"column":19},"end":{"row":11,"column":20}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":11,"column":20},"end":{"row":11,"column":21}},"text":"l"}]}],[{"group":"doc","deltas":[{"action":"removeLines","range":{"start":{"row":16,"column":0},"end":{"row":48,"column":0}},"nl":"\n","lines":["// create schema and models from schema","var Schema = mongoose.Schema;","var ObjectId = Schema.Types.ObjectId;","","var teamSchema = new Schema({","    name: String,","    logo: String,","    shtname: String,","    shtcode:String","});","var Team = mongoose.model('Team',teamSchema);","","var leagueSchema = new Schema({","    name: String,","    logo: String,","    sponsor: String","});","var League = mongoose.model('League',leagueSchema);","","var eventSchema = new Schema({","    name: String,","    league: ObjectId","});","var Event = mongoose.model('Event',eventSchema);","","var playerSchema = new Schema({","    name: String,","    currentTeam: ObjectId,","    currentPosition: ObjectId","});","var Player = mongoose.model('Player', playerSchema);",""]}]}],[{"group":"doc","deltas":[{"action":"removeLines","range":{"start":{"row":15,"column":0},"end":{"row":16,"column":0}},"nl":"\n","lines":[""]}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":17,"column":45},"end":{"row":17,"column":85}},"text":"kahana.mongohq.com:10061/tippingcomptest"},{"action":"insertText","range":{"start":{"row":17,"column":45},"end":{"row":17,"column":77}},"text":"kahana.mongohq.com:10057/offpool"}]}],[{"group":"doc","deltas":[{"action":"removeLines","range":{"start":{"row":21,"column":0},"end":{"row":25,"column":0}},"nl":"\n","lines":["    //clear database","","    //Player.collection.drop();","    //Team.collection.drop();"]}]}],[{"group":"doc","deltas":[{"action":"removeLines","range":{"start":{"row":21,"column":0},"end":{"row":22,"column":0}},"nl":"\n","lines":[""]}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":21,"column":0},"end":{"row":21,"column":1}},"text":"/"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":21,"column":0},"end":{"row":21,"column":1}},"text":"*"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":21,"column":0},"end":{"row":21,"column":1}},"text":"*"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":21,"column":0},"end":{"row":21,"column":1}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":21,"column":0},"end":{"row":21,"column":4}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":32,"column":0},"end":{"row":32,"column":3}},"text":"**/"}]}],[{"group":"doc","deltas":[{"action":"removeLines","range":{"start":{"row":32,"column":0},"end":{"row":33,"column":0}},"nl":"\n","lines":[""]}]}],[{"group":"doc","deltas":[{"action":"removeLines","range":{"start":{"row":32,"column":0},"end":{"row":33,"column":0}},"nl":"\n","lines":[""]}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":20,"column":36},"end":{"row":21,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":21,"column":0},"end":{"row":21,"column":4}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":21,"column":4},"end":{"row":21,"column":5}},"text":"/"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":21,"column":5},"end":{"row":21,"column":6}},"text":"*"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":21,"column":6},"end":{"row":21,"column":7}},"text":"*"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":32,"column":87},"end":{"row":33,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":33,"column":0},"end":{"row":33,"column":4}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":33,"column":4},"end":{"row":33,"column":5}},"text":"*"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":33,"column":5},"end":{"row":33,"column":6}},"text":"*"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":33,"column":6},"end":{"row":33,"column":7}},"text":"/"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":0},"end":{"row":34,"column":87}},"text":"    Team.create({name: 'Western Sydney Wanderers', shtname:'Wanderers', shtcode:'WSW'})"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":34,"column":24},"end":{"row":34,"column":48}},"text":"Western Sydney Wanderers"},{"action":"insertText","range":{"start":{"row":34,"column":24},"end":{"row":34,"column":25}},"text":"N"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":25},"end":{"row":34,"column":26}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":26},"end":{"row":34,"column":27}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":27},"end":{"row":34,"column":28}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":34,"column":40},"end":{"row":34,"column":49}},"text":"Wanderers"},{"action":"insertText","range":{"start":{"row":34,"column":40},"end":{"row":34,"column":41}},"text":"N"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":41},"end":{"row":34,"column":42}},"text":"A"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":34,"column":41},"end":{"row":34,"column":42}},"text":"A"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":41},"end":{"row":34,"column":42}},"text":"/"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":42},"end":{"row":34,"column":43}},"text":"a"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":34,"column":42},"end":{"row":34,"column":43}},"text":"a"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":42},"end":{"row":34,"column":43}},"text":"A"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":34,"column":55},"end":{"row":34,"column":58}},"text":"WSW"},{"action":"insertText","range":{"start":{"row":34,"column":55},"end":{"row":34,"column":56}},"text":"N"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":56},"end":{"row":34,"column":57}},"text":"A"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":60},"end":{"row":34,"column":61}},"text":";"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":4},"end":{"row":34,"column":5}},"text":"m"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":5},"end":{"row":34,"column":6}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":6},"end":{"row":34,"column":7}},"text":"d"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":7},"end":{"row":34,"column":8}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":8},"end":{"row":34,"column":9}},"text":"l"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":9},"end":{"row":34,"column":10}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":10},"end":{"row":34,"column":11}},"text":"/"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":34,"column":10},"end":{"row":34,"column":11}},"text":"/"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":10},"end":{"row":34,"column":11}},"text":"."}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":14,"column":35},"end":{"row":15,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":15,"column":0},"end":{"row":15,"column":35}},"text":"var mongoose = require('mongoose');"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":15,"column":24},"end":{"row":15,"column":32}},"text":"mongoose"},{"action":"insertText","range":{"start":{"row":15,"column":24},"end":{"row":15,"column":25}},"text":"."}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":15,"column":25},"end":{"row":15,"column":26}},"text":"/"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":15,"column":26},"end":{"row":15,"column":27}},"text":"m"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":15,"column":27},"end":{"row":15,"column":28}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":15,"column":28},"end":{"row":15,"column":29}},"text":"d"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":15,"column":29},"end":{"row":15,"column":30}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":15,"column":30},"end":{"row":15,"column":31}},"text":"l"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":15,"column":31},"end":{"row":15,"column":32}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":15,"column":4},"end":{"row":15,"column":13}},"text":"mongoose "},{"action":"insertText","range":{"start":{"row":15,"column":4},"end":{"row":15,"column":5}},"text":"m"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":15,"column":5},"end":{"row":15,"column":6}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":15,"column":6},"end":{"row":15,"column":7}},"text":"d"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":15,"column":7},"end":{"row":15,"column":8}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":15,"column":8},"end":{"row":15,"column":9}},"text":"l"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":15,"column":9},"end":{"row":15,"column":10}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":18,"column":46},"end":{"row":18,"column":76}},"text":"ahana.mongohq.com:10057/offpoo"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":18,"column":46},"end":{"row":18,"column":47}},"text":"l"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":18,"column":45},"end":{"row":18,"column":46}},"text":"k"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":18,"column":45},"end":{"row":18,"column":85}},"text":"kahana.mongohq.com:10061/tippingcomptest"}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":16,"column":0},"end":{"row":16,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1407660036365,"hash":"00b70a2e3d0c985992d0fedf834c364cb14d40b5"}