require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

var currentUrl = 0;
var urls = [];

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function(req, res) {
  if(req.body.url.includes("http") || req.body.url.includes("https")){
    currentUrl += 1;
    urls.push(req.body.url);
    res.json({ original_url: urls[currentUrl-1], short_url: currentUrl});
  }else{
    res.json({error: "invalid url"});
  }
});

app.get('/api/shorturl/:urlNum', function(req, res) {
  let urlNum = parseInt(req.params.urlNum);
  let site = urls[urlNum-1];
  res.redirect(site);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
