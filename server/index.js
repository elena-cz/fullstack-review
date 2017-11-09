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
  
  var username = req.query.term;

  return githubHelper.getReposByUsername(username)
  .then((repos) => {
    db.save(repos);
    res.send();
  });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  
  return db.getTop25()
  .then((topRepos) => {
    res.json(topRepos);
  });




});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});





