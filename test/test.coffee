test = new NUnit.Test "Test cases for jSanno"


test.testCompile = (a) ->
	func = () -> 
		"use strict"
		"aaaa"
		3
		console.log "func"
		return "func"
	# body = func.toString().split( "function",2)[1].split("{",2)[1].split("}")[0] 
	# body = "var func = " + func.toString()
	# console.log body
	# program = esprima.parse body
	# console.log program.body[0].declarations[0].init.body.body
	# literals = []
	# literals = (obj for obj in program.body[0].declarations[0].init.body.body when obj.type == "ExpressionStatement" && obj.expression.type == "Literal" && typeof obj.expression.value == "string") 
	# console.log literals
	# undefined

	annotations = jSanno.compile func
	# console.log literals
	a.eq 2, annotations.length 
	a.eq "use strict", annotations[0].statement
	a.eq "aaaa", annotations[1].statement
	
	a.eq "use", annotations[0].action
	a.eq ["strict"], annotations[0].parameters

	a.eq "aaaa", annotations[1].action
	a.eq [], annotations[1].parameters

test.testAnnotationRecognition = (a) ->
	func = () -> 
		"doAction 1,2,3 ";
		"domain.doAction2 a, b, c ";
		"use strict"
		x = if typeof x != undefined then "x" else "X"
		console.log "func"
		return "func"

	annotations = jSanno.compile func
	# console.log literals
	a.eq 3, annotations.length 
	
	a.eq "doAction", annotations[0].action
	a.eq ["1", "2", "3"], annotations[0].parameters

	a.eq "domain.doAction2", annotations[1].action
	a.eq ["a","b","c"], annotations[1].parameters

	a.eq "use", annotations[2].action
	a.eq ["strict"], annotations[2].parameters

	func = () -> 
		"use strict"
		"doAction 1,2,3 ";
		123;
		"domain.doAction2 a, b, c ";
		
		x = if (typeof x != undefined)  then "x" else "X"
		console.log "func"
		return "func"
	annotations = jSanno.compile func
	# console.log literals
	a.eq 2, annotations.length 

test.jSannoClass = (a) ->
	a.notNull jSanno.Parser
	a.notNull jSanno.Annotation

test.testHandlerContructor = (a) ->
	a.exception ()->
		handler = new jSanno.Handler "com.domain.", ()->
	, "Expection exception from contructor" 

	a.exception ()->
		handler = new jSanno.Handler "", ()->
				# console.log handler.domain
	, "Expection exception from contructor because no action name" 

	handler = new jSanno.Handler "a.b", ()->
	a.eq "a", handler.domain
	# console.log handler.actionName
	# console.log handler.parameters
	# console.log handler.domain

	






