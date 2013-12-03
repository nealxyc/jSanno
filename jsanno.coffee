((global, factory) -> 
	return (module.exports = factory require "esprima", require("interceptor") ) if typeof require == "function" && typeof module != "undefined"
	return define ["esprima", "interceptor"], factory if typeof define == "function"
	return (global.jSanno = factory global.esprima, global.Interceptor ) if global.window == global
)(this, ((esprima) -> 
	"use strict"
	jSannoFactory = (esprima, Interceptor) ->
	
		jSanno = 
			# Registers annotation handlers
			add: () ->
			# Compiles the annotation on the target function and returns and array of Annotation objects. 
			compile: (targetFunc, forced) ->
				targetFunc.__annotations__  = if targetFunc.__annotations__ && !forced then targetFunc.__annotations__ else (new Parser targetFunc).parse()
				# parser = new Parser targetFunc
				# targetFunc.__annotations__ = parser.parse()
				return targetFunc.__annotations__
			enhance: ()->


		jSanno.Parser = 
			class Parser
				constructor: (targetFunc) ->
					@targetFunc = targetFunc 

				parse: () ->
					program = esprima.parse  "var targetFunc = " + @targetFunc.toString()
					statements = program.body[0].declarations[0].init.body.body 
					@annotations = []
					#for stmt, i in statements when stmt.type == "ExpressionStatement" && stmt.expression.type == "Literal" && typeof stmt.expression.value == "string")
					for stmt in statements
						if stmt.type == "ExpressionStatement" && stmt.expression.type == "Literal" && typeof stmt.expression.value == "string"
							@annotations.push new Annotation stmt.expression.value
						else
							break

					return @annotations

		jSanno.Annotation = 
			class Annotation
				constructor: (stmt) ->
					stmt = stmt.trim()
					@statement = stmt
					# console.log stmt
					stmt = stmt.split(/\s+/,2)
					# console.log stmt
					@action = stmt[0]
					@parameters = (elem.trim() for elem in (if stmt.length > 1 then @statement.replace(@action, "").split(",") else []))

		jSanno.Handler =
			class Handler
				constructor: (actionName, actionFuncion)->
					throw Error "Expecting Action name to be a string." if typeof actionName != "string"
					lastDot = actionName.lastIndexOf(".") 
					@domain = actionName.substring(0, lastDot).trim()
					@actionName = actionName.substring(lastDot + 1).replace(@domain, "").trim()
					throw Error "Expecting Action name to have a length greater than 0." if !@actionName 
					@actionFuncion = actionFuncion

		jSanno

)())
# (() ->
# 	# this.jSanno = (typeof module != "undefined"? module: {}).exports = 
# 	return define("esprima", factory) if typeof define == "function"
# 	return (module.exports = jSannoFactory(require("esprima"))) if typeof require == "function" && typeof module != "undefined"
# 	return (this.jSanno = jSannoFactory(this.esprima)) if this.window == this

	
# )()
