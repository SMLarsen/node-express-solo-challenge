var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

// routing modules
app.use(bodyParser.urlencoded({extended: true}));

// initial jokes provided by the client
var jokes = [
  {
    whoseJoke: "Huck",
    jokeQuestion: "What's the difference between roast beef and pea soup?",
    punchLine: "Anyone can roast beef."
  },
  {
    whoseJoke: "Kris",
    jokeQuestion: "How many software engineers does it take to change a lightbulb?",
    punchLine: "None! That's a hardware problem!"
  },
  {
    whoseJoke: "Luke",
    jokeQuestion: "Friends are like snow flakes...",
    punchLine: "If you pee on them they disappear."
  }
];

app.get('/jokes', function(req, res) {
  console.log('get /');
  res.send(jokes);
});

app.post('/joke', function(req, res) {
  console.log('post /');
  res.sendStatus(201);
});

// static files
app.get('/*', function(req, res) {
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, '../server/public/', file));
});


// Set port to listen to
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log("Server is listening on port: " + app.get('port'));
});
