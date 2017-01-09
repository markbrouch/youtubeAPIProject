//Global Variables

var youtube_URL = "https:www.googleapis.com/youtube/v3/search";
//Default sort value
var sort = "date";
var apiKey = "AIzaSyDRmvPOyYPqT68J3JTdSppAWoqEZ4yaG4g";
//What direction (next,previous) will come next
var direction;
//variables to receive pageToken
var next, previous;
//Holds current selected category
var category;
var type = "video";
//Holds value of submitted search
var search;

//End Global Variables


  var updateData = function(direction){
    var params = {
      part:"snippet",
      order: sort,
      key: apiKey,
      maxResults: 48,
      type: type,
      videoCategoryId: category,
      q: search
    };
    if(direction === true){
      //Goes to next page when .click event handler is clicked
      params.pageToken = next;
    }
    else if(direction === false){
      //Goes to previous page when .click event handler is clicked
      params.pageToken = previous;
    }
    console.log(params);
    $.getJSON(youtube_URL, params, function(json){
            //New Videos with every page load
            $('.videos').html(" ");
            //Captures JSON data in "next" global variable
            next = json.nextPageToken;
            //Captures JSON data in "previous" global variable
            previous = json.prevPageToken;
            //Captures JSON array of Objects in "listing"
            var listing = json.items;
            $.each(listing,
              function (i, item) {
                var html = $('.templates .video').clone();
                //Makes "html" into jQuery object
                html = $(html);
                html.find('h3 a').text(item.snippet.title);
                html.find('img').attr('title',item.snippet.title);
                html.find('a').attr('href','https:www.youtube.com/watch?v=' + item.id.videoId);
                html.find('img').attr('src', item.snippet.thumbnails.default.url);
                $('.videos').append(html);
              }
            )
          }
        )
      }

$(document).ready(function(){
  //Click closure to assign key to the current category and update the data
  var clickClosure = function(key){
    return function(){
      category = key;
      updateData();
    };
  };
  //Iterates through Category Object
    for(key in categories){
      var value = categories[key];
      console.log(key, value);
      var html = $('<li><a href="#">' + value + '</a></li>');
      html.on('click', clickClosure(key));
      $('#categories').append(html);
    };
  //Button Event Handlers
  $( "#next" ).click(function() {
    direction = true;
    updateData(direction);
  });
  $( "#prev" ).click(function() {
    direction = false;
    updateData(direction);
  });

  //Sort Dropdown Event Handlers

  $('#top').click(function(){
    sort = 'rating';
    updateData();
  });
  $('#new').click(function(){
    sort = 'date';
    updateData();
  });
  $('#view').click(function(){
    sort = 'viewCountl';
    updateData();
  });

//Search event handler

  $('#search').submit(function(event) {
    event.preventDefault();
    search = $('#searchValue').val();
    updateData();
  })
  updateData();

});

//Categories that populate for category dropdown

var categories = {
2 : "Autos & Vehicles",
1 : "Film & Animation",
10 : "Music",
15 : "Pets & Animals",
17 : "Sports",
18 : "Short Movies",
19 : "Travel & Events",
20 : "Gaming",
21 : "Videoblogging",
22 : "People & Blogs",
23 : "Comedy",
24 : "Entertainment",
25 : "News & Politics",
26 : "Howto & Style",
27 : "Education",
28 : "Science & Technology",
29 : "Nonprofits & Activism",
30 : "Movies",
31 : "Anime/Animation",
32 : "Action/Adventure",
33 : "Classics",
34 : "Comedy",
35 : "Documentary",
36 : "Drama",
37 : "Family",
38 : "Foreign",
39 : "Horror",
40 : "SciFi/Fantasy",
41 : "Thriller",
42 : "Shorts",
43 : "Shows",
44 : "Trailers"
};
