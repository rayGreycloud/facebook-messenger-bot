var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`MessBot Server started on port ${port}`);
});

// Server frontpage
app.get('/', function (req, res) {
  res.send('This is MessBot Server ');
});

// Facebook webhook
app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'messbot_verify_token') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Invalid verify token');
  }
});

// Handler to receive messages
app.post('/webhook', function (req, res) {
  var events = req.body.entry[0].messaging;
  for (i = 0; i < events.length; i++) {
    var event = events[i];

    if (event.message && event.message.text) {
      sendMessage(event.sender.id, {text: "Echo: " + event.message.text});
    }
  }

  res.sendStatus(200);
});
