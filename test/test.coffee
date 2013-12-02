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

	literals = jSanno.compile func
	console.log literals
	a.eq 2, literals.length 
	a.eq "use strict", literals[0].expression.value
	a.eq "aaaa", literals[1].expression.value
