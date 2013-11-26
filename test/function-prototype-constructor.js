(function(){
	var test = NUnit.Test("test that the function.prototype.constructor is writtable.");

	test.objectGetOwnPropertyDescriptor = function(a){
		a.notNull(Object["getOwnPropertyDescriptor"], "Object.getOwnPropertyDescriptor() function should not be null");
	};
	test.protoConstructorWritable = function(a){
		var config = Object.getOwnPropertyDescriptor(Function.prototype, "constructor");
		a.assertTrue(config.writable, "Function.prototype.constructor is writable.") ;
	}

	test.functionWritable = function(a){
		var config = Object.getOwnPropertyDescriptor(window, "Function");
		a.assertTrue(config.writable, "window.Function is writable.") ;
	}

	// test.argumentsEnumerable = function(a){
	// 	var config = Object.getOwnPropertyDescriptor(null, "Function");
	// 	a.assertTrue(config.writable, "window.Function is writable.") ;
	// };

	// test.constructorWritable = function(a){
	// 	var config = Object.getOwnPropertyDescriptor(Function, "constructor");
	// 	a.assertTrue(config.writable, "Function.constructor is writable.") ;
	// }

	test.constructorEq = function(a){
		a.notNull(Function.constructor);
		a.notNull(Function.constructor.constructor);
		a.strictEquals(Function.constructor,  Function.prototype.constructor);
	};

	test.testInterceptFuctionProtoConstructor = function(a){
		// var tr = a.tracer();
		var callCount = 0;
		
		var oldConstructor = Function.prototype.constructor ;

		Function.prototype.constructor = function(){
			callCount ++ ;
			var thisArg = arguments[0];
			var argList = argsToArray(arguments) ;
			return (oldConstructor.bind(this))(argList);
		};

		var func = function(){ return "func";};
		var newF = new Function("return 'newF'");
		var ret = func();
		var ret2 = func.apply(null);
		var ret3 = func.call(null);
		// tr.verify(2);

		//Reset functions
		Function.prototype.constructor = oldConstructor ;
		
		a.eq("func", ret, "func() should return 'func'");
		a.eq("func", ret2, "func.call should return 'func'");
		a.eq("func", ret3, "func.apply should return 'func'");
		//Intercepting Function.prototype.constructor will not do anything.
		a.eq(0, callCount,  "Function.prototype.constructor should be called at least once");
	
	};

	test.testInterceptFuction= function(a){
		// var tr = a.tracer();
		var callCount = 0;
		
		var _Function = Function ;

		Function = function(){
			callCount ++ ;
			var thisArg = arguments[0];
			var argList = argsToArray(arguments) ;
			return _Function.apply(this, argList);
		};

		var func = function(){ return "func";};
		var newF = new Function("return 'newF'");
		var newF2 = Function("return 'newF2'");
		var ret = func();
		var ret2 = newF();
		var ret3 = newF2();

		//Reset function
		Function = _Function ;
		
		a.eq("func", ret, "func() should return 'func'");
		a.eq("newF", ret2, "newF() should return 'newF'");
		a.eq("newF2", ret3, "newF2() should return 'newF2'");
		//Intercepting Function works on new Function() and Function(), but not on function literal: function myFunc(){};
		a.eq(2, callCount,  "Function.prototype.constructor should be called at least once");
	
	};

	var argsToArray = function(args){
			var arr = [];
			if(args && args.length)
			for(var i = 0 ;i < args.length; i ++){
				arr.push(args[i]);
			}
			return arr ;
		};
})();