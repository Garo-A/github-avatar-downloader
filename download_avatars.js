var request = require('request');
var fs = require('fs');
require('dotenv').config();


console.log("Welcome to the GitHub Avatar Downloader!");

var args = process.argv.slice(2);

var owner = args[0];
var repo = args[1];


var user = process.env.GITHUB_USER;
var token = process.env.GITHUB_TOKEN;

console.log(user, token);


function printUser(array){ //CALLBACK -- Takes JSON array, goes through array creating image URL and then passes that thorugh downloader. Also setsd filepath as login
  for(var i = 0; i < array.length; i++) {
    var path = array[i].login;
    downloadImageByURL(array[i].avatar_url + "avatars/" + array[i].login + ".jpg", path);
  }
}

function downloadImageByURL (url, filepath) { //DOWNLOADER -- Takes a given URL and fwets into it, gets image, downloads it using login as name.

  request.get(url)

    .pipe(fs.createWriteStream('./'+ filepath + '.jpg'));
}


function getRepoContributors(repoOwner, repoName, cb){

  if (repoOwner === undefined || ""){
  console.log("Please enter a value for owner field")
  return;
  }

  else if (repoName === undefined || ""){
    console.log("Please enter a value for the repo field")
    return;
  }

  else {
    var options = {
      url: 'https://'+ user + ':' + token + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
      headers: {
        'User-Agent': 'request'
      }
    }

    request.get(options, function(error,response,body){ //REQUEST STARTS HERE
      if(error){ //handles error.
        throw error;
      }
      // Following code is to see if there is an error getting the response and what code and message it returns
      console.log("Response Code: ", response.statusCode);
      console.log("Response Message: ", response.statusMessage);


      // callback function actually executing the entire thing. Will take JSON object and feed it into callback as an array.
      cb(JSON.parse(body));
    })
  }
}

getRepoContributors(owner,repo,printUser);





