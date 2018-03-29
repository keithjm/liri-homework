var dotenv = require("dotenv").config();
var Spotify = require("node-spotify-api");
var request = require("request");
var Twitter = require("twitter");

//Twitter NPM constructor
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

//Spotify NPM constructor
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});

//File import and export
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
  if (command === "my-tweets") {
    var params = { screen_name: "j_m_k1" };
    client.get("statuses/user_timeline", params, function(
      error,
      tweets,
      response
    ) {
      if (!error) {
        //console.log(tweets);
        for (var i = 0; i < (tweets.length || i < 20); i++) {
          console.log("Tweet: " + tweets[i].text);
          console.log("Created On: " + tweets[i].created_at);
          console.log("-------------------------------------------------");
        }
      } else {
        console.log(error);
      }
    });
  } else if (command === "spotify-this-song") {
    console.log("Spotify this song: " + argument);
    var spotifySearch = argument;
    if (spotifySearch === "") {
      spotifySearch = "The Sign Ace of Base";
    }
    spotify.search({ type: "track", query: spotifySearch, limit: 1 }, function(
      err,
      data
    ) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      //console.log(JSON.stringify(data, null, 2));
      var songArtistsArr = data.tracks.items[0].artists;
      var songArtists = "";
      for (var i = 0; i < songArtistsArr.length; i++) {
        if (i > 0) {
          songArtists += ", ";
        }
        songArtists += songArtistsArr[i].name;
      }
      console.log("Artists: " + songArtists);

      console.log("Song Name: " + data.tracks.items[0].name);
      console.log("Song URL: " + data.tracks.items[0].href);
      console.log("Album: " + data.tracks.items[0].album.name);
      //console.log(JSON.parse(data));
    });
  } else if (command === "movie-this") {
    var apiKey = "de208bb7";
    var queryURL =
      "http://www.omdbapi.com/?t=" +
      argument +
      "&y=&plot=short&apikey=" +
      apiKey;
    request(queryURL, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log(
          "Rotten Tomates Rating: " + JSON.parse(body).Ratings[1].Value
        );
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
      }
    });
  } else if (command === "do-what-it-says") {
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
  } else {
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
      //console.log(randomCommand, randomArgument);
      //console.log(randomArgument);
      //console.log(commandInput);
      processCommand(randomCommand, randomArgument);
    }
  });
}
