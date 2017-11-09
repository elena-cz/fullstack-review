const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
const Promise = require("bluebird");





var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});


let repoSchema = mongoose.Schema({
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
  // This function should save a repo or repos to the MongoDB
  // repos is an array of repo objects
  
    Repo.create(repos, function(err) {
       if (err) {
        console.log(err);
      }
      console.log('repo created in DB');
    });

};


let getTop25 = () => {
  
  return new Promise(function(resolve, reject) {
    Repo.
      find().
      limit(25).
      sort('-watchers').
      exec((err, data) => {
        resolve(data);
      });
  })

};




// var exampleRepo3 = {
//   user_id: 7,
//   username: 'elena-cz',
//   github_id: 300,
//   name: 'bestCodeEver',
//   url: 'https://github.com/elena-cz/bestCodeEver',
//   waterchers: 1000
// };

// var exampleRepo4 = {
//   user_id: 8,
//   username: 'elena-cz',
//   github_id: 100,
//   name: 'bestestCodeEver',
//   url: 'https://github.com/elena-cz/bestestCodeEver',
//   waterchers: 1000
// };

module.exports.save = save;
module.exports.getTop25 = getTop25;