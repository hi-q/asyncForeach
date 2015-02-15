'use strict';

var moduleName = 'asyncForeach';

QUnit.config.module = moduleName;
QUnit.module(moduleName);

QUnit.test( "Garbage test", function(assert) {
  var 
  	  garbageTestData = [
  		  0
  		, Number.MAX_VALUE
  		, Number.MIN_VALUE
  		, Number.EPSILON
  		, NaN
  		, Number.POSITIVE_INFINITY
  		, Number.NEGATIVE_INFINITY
  		
  		, ""

  		, true
  		, false

  		, Date.prototype //invalid date
  		, new Date()

  		, (function (i) { return i; })

  		, ({})

  		, null
  		, undefined
  	]
  	;

	garbageTestData.forEach(function(garbage) {

		asyncForeach(garbage, function  (item, index, done) {
	  		done();		
	  	}, generateAssertEndCalled(assert, garbage));

	});

});

QUnit.test( "Aborted iteration test", function(assert) { 

	var array = [1, 2, 3];

	asyncForeach(array, function(item, index, done) {
		return false;
	}, generateAssertEndCalled(assert, array));

});

QUnit.test( "Array test", function(assert) { 

	var array = [1, 2, 3];

	asyncForeach(array, function(item, index, done) {

		setTimeout(function() {
			console.log(item);
			done();
		}, 1000);

	}, generateAssertEndCalled(assert, array));

});

function generateAssertEndCalled(assert, array) {
	var  testDone = assert.async();

	return function () {
		assert.ok(true, "end: done for " + array);
		console.log('end');
		testDone();
	};
}