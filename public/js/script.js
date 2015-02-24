console.log('linked!');
// window.onload = function () {

	var $categButton = $('.categ-button');
	var $videoArea = $('.video-area');
	var $eventsArea = $('.events-area');
	var $myEventsButton = $('#my-events-button');

	function getPieces(id) {
		
		$.ajax({
			url: '/moods/' + id,
			method: 'GET',
			datatype: 'json'
		}).done(function(data){
			var parsed = JSON.parse(data);
			var first = parsed[0];
			$('.description-area').empty();
			$('.description-area').append('<h5>Composer:</h5> ' + first.composer + '<h5>Title:</h5>' + first.title + '<h5>History:</h5>' + first.info);
			$videoArea.append('<iframe id="ytplayer" type="text/html" width="500px" height="290px"src=' + first.url + 'modestbranding=1&autohide=1&showinfo=0&controls=0&autoplay=1frameborder="20"/>');

		});
	};

	$categButton.on('click', function() {
		
		$videoArea.empty();
		var moodId = $(this).attr('id');
		getPieces(moodId);
	});


	$('#events-button').on('click', function(){
		getEventsApi();
		getEventsDB();
	});

	$myEventsButton.on('click', function(){
		$eventsArea.empty();

		$.ajax({
			url: '/favorites/user',
			method: 'GET',
			datatype: 'json'
		}).done(function(data){
			var parsed = JSON.parse(data);
			populateMyFavEventsDOM(parsed);
		});
		scrollTest();
	});


	function populateMyFavEventsDOM(parsed) {

		parsed.forEach(function(each){

			var $div = $("<div>");
			var $deleteFavoritesButton = $('<button class="button-primary" id="deleteFavoritesButton">REMOVE</button>');
			var $event_id = each.id
			var $li = $('<br><h3>Event:</h3>' + each.event_name + '<h3>When:</h3>' + each.date_time_description + '<h3>Location:</h3>' + each.street_address + '<h3>Neighborhood:</h3>' + each.neighborhood + '<h3>Description:</h3>' + each.web_description);
			var venue = each.venue_name
			var $map = $('<iframe width="300" height="350" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBNpdy6OO9UHPL1vudZRxoHZvebSBEuXAw&q=' + venue + ',New+York"></iframe>');
			venue = venue.replace(" ", "+").replace(",", "");

			$map.addClass('six columns map-style');			
			$div.attr('event_id', $event_id);

			$deleteFavoritesButton.on("click", function(){
				deleteFavoriteEvent($event_id);
				$(this).parent('div').remove();
			});

			$div.append($map);
			$div.append($li);
			$div.append($deleteFavoritesButton);
			$div.append('<hr>')
			$eventsArea.append($div);

		});
	}

	function populateEventsDOM(data) {

		data.forEach(function(each){

			var $testDiv = $("<div>");
			var $li = $('<br><h3>Event:</h3>' + each.event_name + '<h3>When:</h3>' + each.date_time_description + '<h3>Location:</h3>' + each.street_address + '<h3>Neighborhood:</h3>' + each.neighborhood + '<h3>Description:</h3>' + each.web_description);
			var $addToFavoritesButton = $('<button class="button-primary" id="addToFavoritesButton">ADD TO FAVORITES</button><hr>');
			var venue = each.venue_name
			var $map = $('<iframe width="300" height="350" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBNpdy6OO9UHPL1vudZRxoHZvebSBEuXAw&q=' + venue + ',New+York"></iframe>');
			venue = venue.replace(" ", "+").replace(",", "");

			$map.addClass('six columns map-style');
			
			$addToFavoritesButton.on("click", function(){
				event_id_hash = {event_id: each.id};
				addFavoriteEvent(event_id_hash);
			});

			$testDiv.append($map);
			$testDiv.append($li);
			$testDiv.append($addToFavoritesButton);
			$eventsArea.append($testDiv);
		});
		scrollTest();
	};

	function getEventsDB() {

		console.log('getEventsDB hit!');

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
	}


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

	function deleteFavoriteEvent(id) {

		$.ajax({
			url: '/favorites/' + id,
			method: 'DELETE',
			datatype: 'json'
		}).done(function(data){
			console.log('deleted!');
		});
	};

	function scrollTest() {
		var $eventsDivTarget = $('.events-area').position().top;
		$('body').animate({scrollTop: $eventsDivTarget}, 'slow');
	}

	function venueNameReplace (venue) {
		var rawName = venue.replace(" ", "+");
		var newName = rawName.replace(",", "");
	}
// }







