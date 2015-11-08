function random(obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
}


$(document).ready(function(){

	$('.open').click(function(){
	$('.rulez').fadeIn()
});

$('.close').click(function(){
	$('.rulez').fadeOut()
});

});

