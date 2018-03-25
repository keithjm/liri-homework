require("dotenv").config();
require("node-spotify-api");
var request = require("request");
require("twitter");


//console.log(process.env);

//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);

var fs = require("fs");

//The command line arguments
var comArgs = process.argv.slice(2);
var comArgsString = comArgs.join(" ");

// user input ex. my-tweets
var liriCommand = process.argv[2];

//user input ex The Bourne Identity
var argument2 = process.argv.slice(3).join(" ");

processCommand(liriCommand, argument2);

//Executes based on user input
function processCommand(command, argument) {
  if(command === "my-tweets") {
  
  } else if(command === "spotify-this-song") {
    console.log("Spotify this song: " + argument);

  } else if(command === "movie-this") {
    var apiKey = "de208bb7";
    var queryURL = "http://www.omdbapi.com/?t=" + argument + "&y=&plot=short&apikey=" + apiKey;
    request(queryURL, function(error, response, body) {

      if (!error && response.statusCode === 200) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomates Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
      }
    })

  } else if(command === "do-what-it-says") {
    runRandomCommand();
  } else {
      console.log("Please enter a valid command");
      console.log("VALID COMMANDS:");
      console.log("       my-tweets");
      console.log("       spotify-this-song <song name>");
      console.log("       movie-this <movie title>");
      console.log("       do-what-it-says");
  }
}

//Adding command to the log file
fs.appendFile("log.txt", comArgsString + "\n", function(err) {

  // If an error was experienced we say it.
  if (err) {
    console.log(err);
  }
  else {
  }
});


function runRandomCommand() {

    fs.readFile("random.txt", "utf8", function(error, data) {
    
      // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
      } else {    
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(" ");
        var randomCommand = dataArr[0];
        var randomArgument = dataArr.slice(1).join(" ");
        var commandInput = [];
        commandInput[0]    

        processCommand(randomCommand, randomArgument);
      }
    });
}
