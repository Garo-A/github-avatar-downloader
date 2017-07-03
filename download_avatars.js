var request = require('request');

console.log("Welcome to the GitHub Avatar Downloader!");


var GITHUB_USER = "Garo-A";
var GITHUB_KEY = "a78268fdb4405dfd0d89420a01fb5fbdd79eaae0";

function getRepoContributors(repoOwner, repoName, cb){
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors'; //Gets you to the contributors endpoint
}


getRepoContributors('jquery', 'jquery', function(err, result){
  console.log("Error: ", err);
  console.log("Result: ", result);
})