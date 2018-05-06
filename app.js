console.log("The app is running.");

var twitter = require('twitter'),
    control = require('./control'),
    express = require('express'),
    bodyParser  = require("body-parser"),
    path    = require('path'),
    app     = express();

//APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//TWITTER PACKAGE USED TO INSERT OAUTH KEYS END AVOID RETYPING THEM
var client = new twitter(control);

//INPUT USERID IN ORDER TO SEARCH FOR YOUR LAST TWEETS
var userID = 992128989924855809;

var object = {
  "username": "",
  "name": "",
  "image": "",
  "friends": [
  ],
  "followers": [
  ],
  "tweets": [
  ]
}


client.get('account/verify_credentials', function(error, data) {
  if(error) throw error;
  object.username = data.screen_name;
  object.name = data.name;
  object.image = data.profile_image_url.replace(/_normal\./, '.');
});


client.get('friends/list', function(error, data) {
  if(error) throw error;
  for(var i = 0; i < data.users.length; i++){
    var friend = {
      "username": "",
      "name": "",
      "image": ""
    }
    friend.username =  data.users[i].screen_name;
    friend.name =  data.users[i].name;
    friend.image =  data.users[i].profile_image_url;

    object.friends[i] = friend;
  }
});


client.get('followers/list', function(error, data) {
  if(error) throw error;
  for(var i = 0; i < data.users.length; i++){
    var follower = {
      "name": "",
      "image": ""
    }
    follower.username =  data.users[i].screen_name;
    follower.name =  data.users[i].name;
    follower.image =  data.users[i].profile_image_url;

    object.followers[i] = follower;

    if(i == 5) break;
  }
});


client.get('statuses/user_timeline', {user_id: 'userID'}, function(error, data) {
  for(var i = 0; i < data.length; i++){
    var tweet = {
      "name": "",
      "username": "",
      "text": "",
      "time": ""
    }

    tweet.name = data[i].user.name;
    tweet.username = data[i].user.screen_name;
    tweet.text = data[i].text;
    tweet.time = data[i].created_at;

    object.tweets[i] = tweet;

    if(i == 10) break;
  }
});


//ROUTES

app.get("/", function(req, res){
    res.redirect("/main");
});

app.get('/main', function(req, res){
  res.render("index.ejs", {
    username: object.username,
    name: object.name,
    image: object.image,
    friends: object.friends,
    followers: object.followers,
    tweets: object.tweets
  });
});

app.get('/tweet', function(req,res){
    res.render("tweet.ejs");
});


app.post('/main', function(req, res){

   client.post('statuses/update', {status: 'I am a tweet'}, function(error, tweet, response) {
      if (!error) {
        console.log(tweet);
      }
  });
});



app.listen(3000);
