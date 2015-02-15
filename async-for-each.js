'use strict';

var debug = false;

function asyncForeach(array, eachFn, endFn) {

	array = array || [];

	var
		  currentElementIndex = 0
		, itemsCount = array.length
	;

	if (!!debug) {
		console.debug('asyncForeach(): array = ' + array);
		console.debug('asyncForeach(): itemsCount = ' + itemsCount);
	}

	if (!itemsCount) {

		if (!!debug) {
			console.debug('asyncForeach(): endFn()');
		}

		setTimeout(endFn, 0);
		return;	
	}

	moveNext();

	function moveNext() {
		if (!!debug) {
			console.debug('moveNext()');
		}

		var 
			  currentElement = array[currentElementIndex]
			, callResult = eachFn(currentElement, currentElementIndex, done)
			, isIterationAborted = callResult === false
		;

		if (!!debug) {
			console.debug('moveNext(): currentElement =' + currentElement);
			console.debug('moveNext(): callResult = ' + callResult);
			console.debug('moveNext(): isIterationAborted = ' + isIterationAborted);
		}

		if (isIterationAborted) {

			if (!!debug) {
				console.debug('moveNext(): endFn()');
			}

			setTimeout(endFn, 0);
			return;
		}
	}

	function done() {
		if (!!debug) {
			console.debug('done()');
		}

		currentElementIndex += 1;

		if (!!debug) {
			console.debug('done(): currentElementIndex = ' + currentElementIndex);
		}

		if (currentElementIndex === itemsCount) {

			if (!!debug) {
				console.debug('done(): endFn()');
			}

			setTimeout(endFn, 0);
			return;
		}

		setTimeout(moveNext, 0);
	}

}