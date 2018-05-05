var friendsButton = document.getElementById('friends');
var followersButton = document.getElementById('followers');

var friends = "<%= friends %>";
var followers = "<%= followers %>";

function displayFriends(){
  var container = document.getElementById("container");

  for(var i = 0; i < friends.length; i++){
    var friend = "<div><img src="+friends[i].image+"><h1>"+friends[i].name+"</h1><h4>"+friends[i].username+"</h4></div>";
    container.insertAdjacentHTML('beforeend', friend)
  }
}

function displayFollowers(){
  var container = document.getElementById("container");

  for(var i = 0; i < followers.length; i++){
    var follower = "<div><img src="+followers[i].image+"><h1>"+followers[i].name+"</h1><h4>"+followers[i].username+"</h4></div>";
    container.insertAdjacentHTML('beforeend', follower)
  }
}


friendsButton.addEventListener("click", displayFriends);
followersButton.addEventListener("click", displayFollowers);
