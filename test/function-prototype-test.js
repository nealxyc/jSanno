(function(){
	var test = NUnit.Test("test that the function.prototype.call and function.prototype.apply is writtable.");

	test.objectGetOwnPropertyDescriptor = function(a){
		a.notNull(Object["getOwnPropertyDescriptor"], "Object.getOwnPropertyDescriptor() function should not be null");
	};
	test.testCall = function(a){
		var config = Object.getOwnPropertyDescriptor(Function.prototype, "call");
		a.assertTrue(config.writable, "Function.prototype.call is writable.") ;
	}

	test.testApply = function(a){
		var config = Object.getOwnPropertyDescriptor(Function.prototype, "apply");
		a.assertTrue(config.writable, "Function.prototype.apply is writable.") ;
	}

	test.testApply = function(a){
		var config = Object.getOwnPropertyDescriptor(Function.prototype, "bind");
		a.assertTrue(config.writable, "Function.prototype.bind is writable.") ;
	}

	test.testIntercept = function(a){
		// var tr = a.tracer();
		var callCount = 0, applyCount = 0, bindCount = 0 ;

		
		var originCall = Function.prototype.call ;
		var originApply = Function.prototype.apply ;
		var originBind = Function.prototype.bind ;
		originBind.apply = originApply ;
		Function.prototype.call = function(){
			callCount ++ ;
			var thisArg = arguments[0];
			var argList = argsToArray(arguments) ;
			if (arguments.length > 1){
				argList.shift();
			}
			return (originApply.bind(this))(thisArg, argList);
		};

		
		Function.prototype.apply = function(){
			applyCount++;
			var thisArg = arguments[0];
			switch(arguments.length){
				case 0:
				case 1:
				return (originApply.bind(this))(thisArg);
				case 2:
				default:
				return (originApply.bind(this))(thisArg, arguments[1]);
			}
		};

		Function.prototype.bind = function(){
			bindCount++;
			var thisArg = arguments[0];
			return originBind.apply(thisArg) ;
		};
		var myObj = {
			func:function(){ return "func";}
		}
		var ret = myObj.func();
		var ret2 = myObj.func.apply(null);
		var ret3 = myObj.func.call(null);
		// tr.verify(2);

		//Reset functions
		Function.prototype.call = originCall ;
		Function.prototype.apply = originApply ;
		Function.prototype.bind = originBind ;
		
		a.eq("func", ret, "func() should return 'func'");
		a.eq("func", ret2, "func.call should return 'func'");
		a.eq("func", ret3, "func.apply should return 'func'");
		a.eq(1, callCount,  "Function.prototype.call should be called at least once");
		a.eq(1, applyCount,  "Function.prototype.apply should be called at least once");
		a.eq(2, bindCount, "Each of apply and call all went to Function.prototype.bind.");
		// a.t(callCount  + applyCount> 0, "callCount + applyCount should be at lease 1.");
	
	};

	// test.testInterceptFunc = function(a){
	// 	// var tr = a.tracer();
	// 	var callCount = 0, applyCount = 0 ;

	// 	var func = function(){ return "func";};
	// 	var oldCall = func.call ;
	// 	var oldApply = func.apply ;
	// 	func.call = function(){
	// 		//tr.once("At least intercept once");
	// 		callCount ++ ;
	// 		var thisArg = arguments[0];
	// 		var argList = argsToArray(arguments) ;
	// 		if (arguments.length > 1){
	// 			argList.shift();
	// 		}
	// 		return (oldApply.bind(this))(thisArg, argList);
	// 	};

		
	// 	func.apply = function(){
	// 		//tr.once("At least intercept once - apply");
	// 		applyCount++;
	// 		var thisArg = arguments[0];
	// 		switch(arguments.length){
	// 			case 0:
	// 			case 1:
	// 			return (oldApply.bind(this))(thisArg);
	// 			case 2:
	// 			default:
	// 			return (oldApply.bind(this))(thisArg, arguments[1]);
	// 		}
	// 	};

	// 	var ret = func();
	// 	// tr.verify(2);

	// 	func.call = oldCall ;
	// 	func.apply = oldApply ;

	// 	a.eq("func", ret, "func should return 'func'");
	// 	a.t((callCount  + applyCount ) > 0, "callCount + applyCount should be at lease 1.");
		
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