const request = require('request');
const config = require('../config.js');
const Promise = require('bluebird');
var rp = require('request-promise');


let getReposByUsername = (username) => {

  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL

  let gihubToken = process.env.GITHUB_TOKEN || config.TOKEN;


  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'Request-Promise',
      'Authorization': `token ${gihubToken}`
    },
    json: true
  };

  return new Promise(function(resolve, reject) {

  rp(options)

    .then((repoItems) => {
      resolve(parseReposResp(repoItems));
    })

    .catch((err) => {
      console.log('API request to GitHub failed', err)
    });
    
  });

};


let parseReposResp = function(repoItems) {

  return new Promise(function(resolve, reject) {
    var repos = [];

      repoItems.forEach( (item) => {
        var repo = {
          user_id: item.owner.id,
          username: item.owner.login,
          github_id: item.id,
          name: item.name,
          url: item.html_url,
          watchers: item.watchers
        };
        repos.push(repo);
      }); 

    resolve(repos);
  });

};


module.exports.getReposByUsername = getReposByUsername;