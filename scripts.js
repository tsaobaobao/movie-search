// const apiKey = '5d576382955ff5829fc3844390db4427';

var baseUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=5d576382955ff5829fc3844390db4427&sort_by=popularity.desc';
var mID;
var genre;
var year;
var completeUrl;


$(function () {
  // After the DOM has loaded, call afterGoClicked after any time the button is clicked
  $('button').click(afterGoClicked);
})

function afterGoClicked() {
  // Read the selected genre id from the select boxes and save it to a variable
  // Hint: use the JQuery .val() function on the element
  // Documentation: http://api.jquery.com/val/
  genre = $('#genre').val();
  // Read the entered year from the text box and save it to a variable
  year = $('#year').val();
  // Call buildQueryString to handle building a completeUrl
  completeUrl = buildQueryString(baseUrl, genre, year);
  // Load the JSON from the API with completeUrl, and then call the afterDataLoaded function
  $.getJSON(completeUrl, afterDataLoaded);
}

/* Combine the baseUrl, genre, and year together to create a complete url with the
  right query parameters. Then return the url.

  Check out examples query params at https://www.themoviedb.org/documentation/api/discover
*/
function buildQueryString(baseUrl, genre, year) {
  var qString = baseUrl + '&with_genres=' + genre + '&primary_release_year=' + year;
  return qString;
}

// Call this function with the data object that comes back from getJSON
function afterDataLoaded(dataObject) {
  // All images have this base URL
  var posterBaseUrl = "https://image.tmdb.org/t/p/w500"

  /* Loop over the results in the //dataObject//. 
    HINT: use your debugger to find the name
    of the property that includes the array of results. 
  */
  for (var n = 0; n < dataObject.results.length; n++) {
    /* For each result:
      - Look up a corresponding img element (in order)
      - Set the img element's src tag to posterBaseUrl + the poster_path from the result movie
     */
    $('#movieImg' + n).attr('src', posterBaseUrl + dataObject.results[n].poster_path);
  }
  var bGround = new Image();
  bGround.src = movieImg0.src;
  document.body.background = bGround.src;
}

$(function () {
  $(document).on('click', 'img', function () {
    genre = $('#genre').val();
    year = $('#year').val();
    mID = $(this).attr('src');
    alert('Adding to moviePins...');
    alert(mID + genre + year);
    $.ajax({
    	url: 'http://localhost:3000/pin/addPin?id='+ mID + '&year=' + year + '&genre=' + genre
    });
  })
})