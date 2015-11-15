var ref = new Firebase("https://intersection-game.firebaseio.com/games");

/* ref.push({
 name: "1st St. & North Ave.",
 url: "game1.html"

})*/

ref.on('child_added', function(s){
	var game = s.val();
	$('div.intersections').append('<a href="' + game.url + '">' + game.name + '</a>');
	console.log(game, s.val());


});

ref.on('value', function(s){
	var i = 0;
	for (var key in s.val()){
		var game = s.val()[key];
		if (game.players >= 2) {
			$('div.intersections a').eq(i).attr('href', '').addClass('full');

		} else {
			$('div.intersections a').eq(i).attr('href', game.url).removeClass('full');

		};
		i++
	}

});