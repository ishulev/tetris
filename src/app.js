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
			bottom: 1,
			top: 1
		};
	};
	function createFigureObject(centerPosition, compound){
		var figure = {};
		if(compound.top){
			figure.previousRow = [centerPosition];
		}
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
		clearRow(frow);
		drawSquares(frow, mappedFigure.currentRow);
		if(mappedFigure.nextRow) {
			var nextRowNum = currentRow+1;
			var nextRow = tbody.children(':nth-child(' + nextRowNum + ')');
			clearRow(nextRow);
			drawSquares(nextRow, mappedFigure.nextRow);
		}
		if(mappedFigure.previousRow) {
			var previousRowNum = currentRow-1;
			var previousRow = tbody.children(':nth-child(' + previousRowNum + ')');
			clearRow(previousRow);
			drawSquares(previousRow, mappedFigure.previousRow);
		}
	};


	$(function() {
		var currentBoxNum = 6;
		var figure = new FigureT();
		var currentRow = 1;
		var playfield = $('#playfield');
		var tbody = playfield.children().first();
		var frow = tbody.children().first();
		var centerChild = ':nth-child(' + currentBoxNum + ')';
		var mappedFigure = createFigureObject(currentBoxNum, figure.figureCompound);
		
		drawFigure(currentRow, tbody, mappedFigure);


		function moveLeft(){
			currentBoxNum--;
		};

		function moveRight(){
			currentBoxNum++;
		};

		$(document).keydown(function(e) {
			if(currentRow == 22){
				return;
			}
			switch(e.which) {
				case 37: // left
					moveLeft();
					moveFigureDown();
				break;

				case 38: // up
				break;

				case 39: // right
					moveRight();
					moveFigureDown();
				break;

				case 40: // down
				break;

				default: return; // exit this handler for other keys
			}
			e.preventDefault(); // prevent the default action (scroll / move caret)
		});

		function moveFigureDown(){
			mappedFigure = createFigureObject(currentBoxNum, figure.figureCompound);
			drawFigure(currentRow, tbody, mappedFigure);
		}

		var intervalMoveDown = setInterval(function(){
			currentRow++;
			if(currentRow == 22){
				clearInterval(intervalMoveDown);
				return;
			}
			removePreviousBoxes(tbody, currentRow);
			moveFigureDown();
		}, 1000);
	});
})(jQuery);