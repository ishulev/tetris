(function(){
	'use strict';
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	window.onload = function() {
		console.log('loaded!');
		var startingSquare = getRandomInt(1, 12);
		var playfield = document.getElementById('playfield');
		setTimeout(function(){
			console.log(playfield);
		}, 1000);
	}
})();