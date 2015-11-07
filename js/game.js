var ref = new Firebase("https://intersection-game.firebaseio.com/games");

var gameRef = null;

var players = 0; 

var url = window.location.href
url = url.split('/');
url = url[url.length-1];

ref.on('child_added', function(s){
	var game = s.val();
	if (game.url == url) {
		players = game.players ? game.players + 1 : 1
		gameRef = new Firebase("https://intersection-game.firebaseio.com/games/" + s.key());
		gameRef.update({
			'players' : players
		});
		window.onbeforeunload = function() {
			players--
			gameRef.update({
				'players' : players
			});
		}
		gameRef.on('value', function(s){
			players = s.val().players;
			if (players == 1) {
				firstPlayer();
			};
			if (players == 2) {
				startGame();
			}

		});
	};



});
$('body>div').hide();

function emptyCountdown(){
	$('.countdown h1').text('')
};

function firstPlayer(){
	$('.waiting').show().siblings().hide();
	emptyCountdown();

};

function showCountdown(){
	var timer = 3;
	$('.countdown').show().siblings().hide();
	var interval = setInterval(function(){
		$('.countdown h1').text(timer + '...');
		timer--;
		if (timer == 0) {
			clearInterval(interval);
		}
	}, 1000);

};

function startGame(){
	showCountdown();
};




