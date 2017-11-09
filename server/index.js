const express = require('express');
let app = express();
const githubHelper = require('../helpers/github.js');
const db = require('../database/index.js');
const Promise = require('bluebird');



console.log('/server/index.js was run');

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  
  console.log('req.query.term', req.query.term);

  var username = req.query.term;

  // Send GET request to GitHub API 

  return githubHelper.getReposByUsername(username)
  .then((repos) => {
    db.save(repos);
  });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});




