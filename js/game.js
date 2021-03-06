var ref = new Firebase("https://intersection-game.firebaseio.com/games");

var gameRef = null;

var playersRef = null;

var startRef = null;

var players = 0; 

var timeoutId; 

var dummyRef = null;

function updateTimeout(change){
	if (timeoutId){
		clearTimeout(timeoutId);
	}
	if(change){
		gameRef.update({
			'dummy': Math.round(1000000*Math.random())
		});
	}
	
	timeoutId = setTimeout(function(){
		gameRef.update({
			'players': 0
		})
		return window.location.assign('http://intersection-game.lisaot.to');
	}, 300000);
}

var url = window.location.href
url = url.split('/');
url = url[url.length-1];

ref.on('child_added', function(s){
	var game = s.val();
	if (game.url == url) {
		if (game.players && game.players >= 2){
			return window.location.assign('http://intersection-game.lisaot.to');
		}

		players = game.players ? game.players + 1 : 1
		gameRef = new Firebase("https://intersection-game.firebaseio.com/games/" + s.key());
		gameRef.update({
			'players' : players, 
			'dummy': Math.round(1000000*Math.random())
		});
		 playersRef = gameRef.child('players');
		 startRef = gameRef.child('start');
		 dummyRef = gameRef.child('dummy');

		gameRef.onDisconnect().update({
			'players': players-1
		});

		playersRef.on('value', function(s){
			players = s.val();
			if (players == 1) {
				firstPlayer();
			};
			if (players == 2) {
				startGame();
			};

		});

		dummyRef.on('value', function(s){
			updateTimeout(false);

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

var tick = new Audio();
tick.src = './timer.mp3'

function showCountdown(callback){
	var timer = 3;
	updateTimeout(true);
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
	var timer = 5;
	tick.play();
	var interval = setInterval(function(){
		timer--;
		if (timer == 0) {
			clearInterval(interval);
		}

	}, 1000);
	setTimeout(function(){
		showReadyButton(signal);
	}, 5000);


};

function showReadyButton(signal){
	$('.ready').show().siblings().hide();
	$('.review').html(signal.clone().removeClass('vcenter'));
}
$('.ready h2').click(function(){
		gameRef.update({
			start:true
		});
	});

function startGame(){
	//showCountdown(selectSignal);
	showReadyButton();


}




