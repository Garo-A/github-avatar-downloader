var request = require('request');
var fs = require('fs');
require('dotenv').config();


console.log("Welcome to the GitHub Avatar Downloader!");

var args = process.argv.slice(2);

var owner = args[0];
var repo = args[1];


var user = process.env.GITHUB_USER;
var token = process.env.GITHUB_TOKEN;

//CALLBACK -- Takes JSON array, goes through array creating image URL and then passes that thorugh downloader. Also setsd filepath as login
function printUser(array){
  for(var i = 0; i < array.length; i++) {
    var path = array[i].login;
    downloadImageByURL(array[i].avatar_url + "avatars/" + array[i].login + ".jpg", path);
  }
}

//DOWNLOADER -- Takes a given URL and fwets into it, gets image, downloads it using login as name.
//This will also check to see if the directory exists, and if it doesn't, it will create it.
function downloadImageByURL (url, filepath) {
  myDir = "./avatar/"
  fs.access(myDir, function(err){
    if (err && err.code === 'ENOENT') {
    fs.mkdir(myDir);
    }
  })
  request.get(url)

    .pipe(fs.createWriteStream('./avatar/'+ filepath + '.jpg'));
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

    //REQUEST STARTS HERE
    request.get(options, function(error,response,body){
      if(error){ //handles error.
        console.log("The owner or repo do not exist");
        throw error;

      }

      // Following code is to see if there is an error getting the response and what code and message it returns
      console.log("Response Code: ", response.statusCode);
      console.log("Response Message: ", response.statusMessage);

      if (response.statusCode === 401) {
        if (user === undefined && token === undefined){
          console.log("Plese create .env file");
          return;
        }
        else if (user === undefined || token === undefined){
          console.log("Plese update .env file");
          return;
        }
        else {
          console.log("Please check credentials");
          return;
        }
      }


      // callback function actually executing the entire thing. Will take JSON object and feed it into callback as an array.
      cb(JSON.parse(body));
    })
  }
}

getRepoContributors(owner,repo,printUser);

