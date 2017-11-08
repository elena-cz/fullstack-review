const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var Promise = require("bluebird");

console.log('/database/index.js was run');


var exampleRepo3 = {
  user_id: 7,
  username: 'elena-cz',
  github_id: 300,
  name: 'bestCodeEver',
  url: 'https://github.com/elena-cz/bestCodeEver',
  waterchers: 1000
};

var exampleRepo4 = {
  user_id: 8,
  username: 'elena-cz',
  github_id: 100,
  name: 'bestestCodeEver',
  url: 'https://github.com/elena-cz/bestestCodeEver',
  waterchers: 1000
};



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB connected!')
  save([exampleRepo3, exampleRepo4]);
});


let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  // id: mongoose.Schema.Types.ObjectId,
  user_id: Number,
  username: String,
  github_id: { type: String, unique: true },
  name: String,
  url: String,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  // repos is an array of repo objects

  console.log('save function ran');
  
  // Does not save if github_id already exists in DB
  Repo.on('index', function(err) { // <-- Wait for model's indexes to finish
    if (err) {
      throw err;
    }
    Repo.create(repos, function(err) {
       if (err) {
        console.log(err);
      }
      console.log('repo created in DB');
    });
  });



};



module.exports.save = save;