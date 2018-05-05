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
  "friends": {
    "username": "",
    "name": "",
    "image": ""
  },
  "followers":{
    "username": "",
    "name": "",
    "image": ""
  }
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
    object.friends.username =  params.users.screen_name;
    object.friends.name =  params.users.name;
    object.friends.image =  params.users.profile_image_url;
  }
});

client.get('followers/list', function(error, params) {
  if(error) throw error;
  for(var i = 0; i < params.users.length; i++){
    object.followers.username =  params.users.screen_name;
    object.followers.name =  params.users.name;
    object.followers.image =  params.users.profile_image_url;
  }
});


//ROUTES

app.get("/", function(req, res){
    res.redirect("/main");
});

app.get('/main', function(req, res){
  res.render("index.ejs", {username: object.username, name: object.name, image: object.image, friends: object.friends, followers: object.following});
});



app.listen(3000);
