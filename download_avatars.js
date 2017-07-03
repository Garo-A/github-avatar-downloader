var request = require('request');
var fs = require('fs');

console.log("Welcome to the GitHub Avatar Downloader!");


var GITHUB_USER = "Garo-A";
var GITHUB_TOKEN = "a78268fdb4405dfd0d89420a01fb5fbdd79eaae0";



function getRepoContributors(repoOwner, repoName, cb){


  var options = {
    url: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request'
    }
  }

  request.get(options) //REQUEST STARTS HERE

    .on('error', function(err){ //handles Errors
      throw err;
    })

    .on('response', function(response){ //Shows me if my response went through, and if it didn't, which code and message.
      console.log("Response Code: ", response.statusCode);
      console.log("Response Message: ", response.statusMessage);
    })

}

getRepoContributors('jquery','jquery');

