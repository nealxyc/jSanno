(function(){
	var test = new NUnit.Test("Test cases for jSanno in javascript");

	test.testCompileJSFunction = function(a){
		var func = function(){
			/**
			blabla
			*/
			"use strict"
			"aaaa"
			/**
			this is comment
			*/
			//this is another comment;
			123;
			"This should not included"
			var x = "";
			return x ;
		}
		var annotations = jSanno.compile(func)
		a.eq(2, annotations.length) 
		a.eq ("use strict", annotations[0].statement)
		a.eq("aaaa", annotations[1].statement)

	}

})()
