const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');


app.use(express.static(__dirname + '/public'));


var routy = require('./routes/routes.js');
app.use('/', routy);

/*
app.get('/', function(req, res) {
   res.render('results'); 
});
*/
var voteHistory = [
	{
		district: 'Vasakyrkan',
		amountOfVotes: 263,
		politicalParty: 'Miljöpartister i Svenska kyrkan'
	},
	{
		district: 'Masthuggskyrkan',
		amountOfVotes: 620,
		politicalParty: 'Arbetarepartiet - Socialdemokraterna'
	},
	{
		district: 'Masthuggskyrkan',
		amountOfVotes: 233,
		politicalParty: 'FRIMODIG KYRKA'
	},
	{
		district: 'Kortedala kyrka',
		amountOfVotes: 62,
		politicalParty: 'Vänstern i Svenska Kyrkan'
	},
	{
		district: 'Gårdstenskyrkan',
		amountOfVotes: 315,
		politicalParty: 'Arbetarepartiet - Socialdemokraterna'
	},
	{
		district: 'Gårdstenskyrkan',
		amountOfVotes: 26,
		politicalParty: 'Fria liberaler i Svenska kyrkan FiSK'
	}
];


io.on('connection', (socket) => {
	io.emit('History', voteHistory);
	socket.on('disconnect', () => {
		console.log("Now disconnected.");
	});
	socket.on('Votes', (data) => {
		voteHistory.push(data);
		io.emit('Votes', data);
	});
});

app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

http.listen(3007, () => {
	console.log("Up and running at 3007");
});
