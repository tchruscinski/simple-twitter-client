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


var client = new twitter(control);


var object = {
  "username": "",
  "name": "",
  "image": "",
  "friends": [
  ],
  "followers": [
  ]
}

client.get('account/verify_credentials', function(error, params) {
  if(error) throw error;
  object.username = params.screen_name;
  object.name = params.name;
  object.image = params.profile_image_url;
});

client.get('friends/list', function(error, params) {
  if(error) throw error;
  for(var i = 0; i < params.users.length; i++){
    var friend = {
      "username": "",
      "name": "",
      "image": ""
    }
    friend.username =  params.users[i].screen_name;
    friend.name =  params.users[i].name;
    friend.image =  params.users[i].profile_image_url;

    object.friends[i] = friend;
  }
});

client.get('followers/list', function(error, params) {
  if(error) throw error;
  for(var i = 0; i < params.users.length; i++){
    var follower = {
      "name": "",
      "image": ""
    }
    follower.username =  params.users[i].screen_name;
    follower.name =  params.users[i].name;
    follower.image =  params.users[i].profile_image_url;

    object.followers[i] = follower;
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
    followers: object.followers});
});



app.listen(3000);
