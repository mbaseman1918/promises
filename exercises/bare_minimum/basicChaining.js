/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var prom = require('./promiseconstructor.js');
var ific = require('./promisification.js');
var writeFileAsync = Promise.promisify(fs.writeFile);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  // grabs the user name
  return prom.pluckFirstLineFromFileAsync(readFilePath)
    //takes the user name and grabs the user profile
    .then(function(user) {
      return ific.getGitHubProfileAsync(user);
    })
    // takes the user profile and writes it into a file
    .then(function(userprofile) {
      return writeFileAsync(writeFilePath, JSON.stringify(userprofile));
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
