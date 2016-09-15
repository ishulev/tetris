(function($){
	'use strict';
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	var startingSquare = getRandomInt(1, 12);
	$(function() {
		var playfield = $('#playfield');
		console.log(playfield);
	});
})(jQuery);