(function(){
	var test = NUnit.Test("test that the Object is writtable.");

	test.objectGetOwnPropertyDescriptor = function(a){
		a.notNull(Object["getOwnPropertyDescriptor"], "Object.getOwnPropertyDescriptor() function should not be null");
	};
	test.objectWritable = function(a){
		var config = Object.getOwnPropertyDescriptor(window, "Object");
		a.assertTrue(config.writable, "Object is writable.") ;
	}

	// test.testInterceptObject = function(a){
	// 	// var tr = a.tracer();
	// 	var callCount = 0;
		
	// 	var _Function = Function ;

	// 	Function = function(){
	// 		callCount ++ ;
	// 		var thisArg = arguments[0];
	// 		var argList = argsToArray(arguments) ;
	// 		return _Function.apply(this, argList);
	// 	};

	// 	var func = function(){ return "func";};
	// 	var newF = new Function("return 'newF'");
	// 	var newF2 = Function("return 'newF2'");
	// 	var ret = func();
	// 	var ret2 = newF();
	// 	var ret3 = newF2();

	// 	//Reset functions
	// 	Function = _Function ;
		
	// 	a.eq("func", ret, "func() should return 'func'");
	// 	a.eq("newF", ret2, "newF() should return 'newF'");
	// 	a.eq("newF2", ret3, "newF2() should return 'newF2'");
	// 	a.eq(2, callCount,  "Function.prototype.constructor should be called at least once");
	
	// };

	var argsToArray = function(args){
			var arr = [];
			if(args && args.length)
			for(var i = 0 ;i < args.length; i ++){
				arr.push(args[i]);
			}
			return arr ;
		};
})();