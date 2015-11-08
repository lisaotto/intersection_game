var ref = new Firebase("https://intersection-game.firebaseio.com/games");

var gameRef = null;

var playersRef = null;

var startRef = null;

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
		 playersRef = gameRef.child('players');
		 startRef = gameRef.child('start');

		window.onbeforeunload = function() {
			players--
			gameRef.update({
				'players' : players
			});
		}

		playersRef.on('value', function(s){
			players = s.val();
			if (players == 1) {
				firstPlayer();
			};
			if (players == 2) {
				startGame();
			};

		});


		startRef.on('value', function(s){
			var start = s.val();
			if (start == true) {
				showCountdown(selectSignal);
			};

		});
	};



});
$('body>div').hide();

function emptyCountdown(){
	$('.countdown h1').text('')
}

function firstPlayer(){
	$('.waiting').show().siblings().hide();
	emptyCountdown();

}

function showCountdown(callback){
	var timer = 3;
	$('.countdown').show().siblings().hide();
	var interval = setInterval(function(){
		$('.countdown h1').text(timer + '...');
		timer--;
		if (timer == 0) {
			clearInterval(interval);
			setTimeout(callback, 1000);
			gameRef.update({
				start:false
			});
		}

	}, 1000);

}

function selectSignal(){
	emptyCountdown();
	var wait = $('.wait');
	var go = $('.go');
	var container = random([wait, wait, go]);
	var signal = $(random(container.children().toArray()));
	signal.show().siblings().hide();
	container.show().siblings().hide();
	setTimeout(showReadyButton, 5000);

};

function showReadyButton(){
	$('.ready').show().siblings().hide();
	$('.ready h2').click(function(){
		gameRef.update({
			start:true
		});
	});

}

function startGame(){
	//showCountdown(selectSignal);
	showReadyButton();


}




