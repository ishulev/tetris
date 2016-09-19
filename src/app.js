(function($){
	'use strict';
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	function timedMoveDown(currentBoxNum, currentRow, tbody) {
		tbody.children(':nth-child(' + currentRow + ')').children(':nth-child(' + currentBoxNum + ')').addClass('danger');
		var currentRow = currentRow++;
		console.log(currentRow);
	}

	var Figure = function() {
		this.rotation = Math.random() < 0.5 ? true : false;
	};

	function FigureT(){
		Figure.call(this);
		this.figureCompound = {
			left: 1,
			right: 1,
			bottom: 1
		};
	};
	function createFigureObject(centerPosition, compound){
		var figure = {};
		if(compound.left){
			figure.currentRow = [centerPosition-1, centerPosition];
		}
		if(compound.right) {
			figure.currentRow.push(centerPosition + 1);
		}
		if(compound.bottom) {
			figure.nextRow = [centerPosition];
		}
		return figure;
	};

	// Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
	FigureT.prototype = Object.create(Figure.prototype);
	FigureT.prototype.constructor = FigureT;

	function drawSquares(frow, currentRow){
		for(var i=0; i < currentRow.length; i++){
			var child = ':nth-child(' + currentRow[i] + ')';
			var square = frow.children(child);
			square.addClass('danger');
		}
	};

	function clearRow(rowObject){
		rowObject.children().removeClass('danger');
	};

	function removePreviousBoxes(tbody, currentRow){
		for(var i=0; i < currentRow; i++){
			clearRow(tbody.children(':nth-child(' + i + ')'));
		}
	};

	function drawFigure(currentRow, tbody, mappedFigure){
		var frow = tbody.children(':nth-child(' + currentRow + ')');
		drawSquares(frow, mappedFigure.currentRow);
		if(mappedFigure.nextRow) {
			currentRow++;
			var nextRow = tbody.children(':nth-child(' + currentRow + ')');
			drawSquares(nextRow, mappedFigure.nextRow);
		}
	};

	$(function() {
		var figure = new FigureT();
		console.log(figure);
		var currentRow = 1;
		var currentBoxNum = 6;
		var playfield = $('#playfield');
		var tbody = playfield.children().first();
		var frow = tbody.children().first();
		var centerChild = ':nth-child(' + currentBoxNum + ')';
		var mappedFigure = createFigureObject(currentBoxNum, figure.figureCompound);
		
		drawFigure(currentRow, tbody, mappedFigure);

		console.log(mappedFigure);
		var intervalMoveDown = setInterval(function(){
			currentRow++;
			if(currentRow == 22){
				clearInterval(intervalMoveDown);
				return;
			}
			removePreviousBoxes(tbody, currentRow);
			drawFigure(currentRow, tbody, mappedFigure);
		}, 1000);
	});
})(jQuery);