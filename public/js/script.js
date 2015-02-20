console.log('linked!');
window.onload = function () {
var $categButton = $('.categ-button');
var $videoArea = $('.video-area');
var $eventsArea = $('.events-area');
var $myEventsButton = $('#my-events-button');
// var $eventsList = $('.ul-area');

function getPieces(id) {
	
	$.ajax({
		url: '/moods/' + id,
		method: 'GET',
		datatype: 'json'
	}).done(function(data){
		var parsed = JSON.parse(data);
		var first = parsed[0];
		// console.log(first.url, first.title, first.url);
		$('.description-area').empty();
		$('.description-area').append('Composer: ' + first.composer + '<h5>Title:</h5>' + first.title + '<h5>History:</h5>' + first.info);
		$videoArea.append('<iframe id="ytplayer" type="text/html" width="500px" height="290px"src=' + first.url + 'modestbranding=1&autohide=1&showinfo=0&controls=0&autoplay=1frameborder="20"/>');

	});
};

$categButton.on('click', function() {
	
	$videoArea.empty();
	var moodId = $(this).attr('id');
	getPieces(moodId);
});


//*****SHOW ALL EVENTS ***********************

$('#events-button').click(function(){
	getEventsApi();
	getEventsDB();
})

$myEventsButton.on('click', function(){
	$eventsArea.empty();

	$.ajax({
		url: '/favorites/user',
		method: 'GET',
		datatype: 'json'
	}).done(function(data){
		var parsed = JSON.parse(data);
		populateMyFavEventsDOM(parsed);
	})
})


function populateMyFavEventsDOM(parsed) {

	parsed.forEach(function(each){

	var $li = $('<h3>Event:</h3>' + each.event_name +' ' + '<h3>Location</h1>' + each.street_address + '<h3>Neighborhood:</h3>' + each.neighborhood + each.web_description + each.date_time_description);

	$eventsArea.append($li);

	})
}




function populateEventsDOM(data) {
	

	data.forEach(function(each){


			var $testDiv = $("<div>");
			var $li = $('<br><h3>Event:</h3>' + each.event_name +' ' + '<h3>Location</h3>' + each.street_address + '<h3>Neighborhood:</h3>' + each.neighborhood + each.web_description + each.date_time_description);
			// debugger
			var $addToFavoritesButton = $('<button class="button-primary" id="addToFavoritesButton">ADD TO FAVORITES</button>');
			
			// $li.attr('api_id', each.id);
			// $eventsArea.append('<br><h1>Event:</h1>' + each.event_name +' ' + '<h1>Location</h1>' + each.street_address + '<h1>Neighborhood:</h1>' + each.neighborhood + each.web_description + each.date_time_description + "<br><button id='add-to-favorites'>ADD TO FAVORITES</button><br><hr>")
			$addToFavoritesButton.on("click", function(){
					event_id_hash = {event_id: each.id}
					addFavoriteEvent(event_id_hash);
					// addFavoriteEvent(event_id_hash);
			});

			$testDiv.append($li)
			$testDiv.append($addToFavoritesButton)
			// $li.append($addToFavoritesButton);
			$eventsArea.append($testDiv);
	});
};
// };

function getEventsDB() {

	console.log('getEventsDB hit!');

	// var $addToFavoritesButton = $('#add-to-favorites');
	$eventsArea.empty();

	$.ajax({
		url: '/eventsdb',
		method: 'GET',
		datatype: 'json'
	}).done(function(data){
		var parsed = JSON.parse(data);
		populateEventsDOM(parsed);

	});
};

		// var parsed = JSON.parse(data)

		// parsed.forEach(function(each){

		// 	var $li = $('<br><h1>Event:</h1>' + each.event_name +' ' + '<h1>Location</h1>' + each.street_address + '<h1>Neighborhood:</h1>' + each.neighborhood + each.web_description + each.date_time_description + "<br><button id='add-to-favorites'>ADD TO FAVORITES</button><br><hr>");
		// 	// var $addToFavoritesButton = $('<button id="addToFavoritesButton">addToFavoritesButton</button>');
		// 	$li.attr('api_id', each.event_api_id);
		// 	// $eventsArea.append('<br><h1>Event:</h1>' + each.event_name +' ' + '<h1>Location</h1>' + each.street_address + '<h1>Neighborhood:</h1>' + each.neighborhood + each.web_description + each.date_time_description + "<br><button id='add-to-favorites'>ADD TO FAVORITES</button><br><hr>")
		// 	$('#add-to-favorites').on("click", function(){
		// 			console.log('hello');
		// 			// event_id_hash = {event_id: each.event_api_id}
		// 			// addFavoriteEvent(event_id_hash);
		// 	});
		// 	$eventsArea.append($li);
		// 	// $li.append($addToFavoritesButton);
		// });

function getEventsApi() {

	console.log('getEventsApi hit!');

	$.ajax({
		url: '/events',
		method: 'GET',
		datatype: 'json'
	}).done(function(data){
		console.log(data);
	});
};

function getMyEvents() {

	console.log('getMyEvents hit!');

	$eventsArea.empty();

	$.ajax({
		url: '/favorites/user',
		method: 'GET',
		datatype: 'json'
	}).done(function(data){
		console.log(data);
	});
};

// $addToFavoritesButton.on('click', function() {


// })


function addFavoriteEvent(event_id_hash) {

	console.log('addFavoriteEvent hit!');

	$.ajax({
		url: '/favorites',
		method: 'POST',
		datatype: 'json',
		data: event_id_hash
	}).done(function(data){
		console.log(data);
	});
};

		// data: ({"event_id": attrs.event_id})



// function addFavoriteEvent(user_id, event_id) {

// 	console.log('addFavoriteEvent hit!');

// 	$.ajax({
// 		url: '/favorites',
// 		method: 'POST',
// 		datatype: 'json',
// 		data: JSON.stringify({user_id: user_id, event_id: event_id})
// 	}).done(function(data){
// 		console.log(data);
// 	});
// };


}







