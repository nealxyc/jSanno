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

	test.testIntercept = function(a){
		var tr = a.tracer();
		var func = function(){ return "func";};
		var oldCall = Function.prototype.call ;
		Function.prototype.call = function(){
			tr.once("At least intercept once");
			var thisArg = arguments[0];
			switch(arguments.length){
				case 1:
				return oldCall(thisArg);
				case 2:
				return oldCall(thisArg, arguments[1]);
			}
			//return oldCall(argument[0], argsToArray(arguments));
		};

		a.eq("func", func());
		tr.verify(1);

		Function.prototype.call = oldCall ;
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