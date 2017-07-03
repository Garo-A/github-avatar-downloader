var request = require('request');
var fs = require('fs');

console.log("Welcome to the GitHub Avatar Downloader!");


var GITHUB_USER = "Garo-A";
var GITHUB_TOKEN = "a78268fdb4405dfd0d89420a01fb5fbdd79eaae0";


function printUser(array){ //CALLBACK -- Takes JSON array, goes through array creating image URL and then passes that thorugh downloader/
  for(var i = 0; i < array.length; i++) {
    var path = array[i].login;
    downloadImageByURL(array[i].avatar_url + "avatars/" + array[i].login + ".jpg", path);
  }
}


function getRepoContributors(repoOwner, repoName, cb){

  var data = "";
  var options = {
    url: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request'
    }
  }

  request.get(options, function(error,response,body){ //REQUEST STARTS HERE
    if(error){
      throw error;
    }

    console.log("Response Code: ", response.statusCode);
    console.log("Response Message: ", response.statusMessage);


    cb(JSON.parse(body)); //THIS BASICALLY GENERATES THE URL
  })
}

getRepoContributors('jquery','jquery', printUser);



function downloadImageByURL (url, filepath) { //DOWNLOADER -- Takes a given URL and fwets into it, gets image, downloads it using login as name.

  request.get(url)

    .pipe(fs.createWriteStream('./'+ filepath + '.jpg'));
}
