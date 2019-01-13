// server.js
// where your node app starts

// init project
var express = require('express');
let bodyParser = require('body-parser');
let useragent = require('express-useragent');
var app = express();

app.use(bodyParser.json());
app.use(useragent.express());


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// parser 

app.get("/api/whoami", (req,res) => {
  
  let headers = req.headers;
  let ipaddress = headers["x-forwarded-for"].split(",")[0];
  let language = headers["accept-language"];
  let software = headers["user-agent"];
  
  res.json({ 
    ipaddress, language, software
  });
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
