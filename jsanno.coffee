((global, factory) -> 
	return define "esprima", factory if typeof define == "function"
	return (module.exports = factory require "esprima" ) if typeof require == "function" && typeof module != "undefined"
	return (global.jSanno = factory global.esprima ) if global.window == global
)(this, ((esprima) -> 
	jSannoFactory = (esprima) ->
	
		jSanno = 
			add: () ->
			# Compiles the annotation on the target function and returns and array of Annotation objects. 
			compile: (targetFunc) ->
				parser = new Parser targetFunc
				return parser.parse()

		class Parser
			constructor: (targetFunc) ->
				@targetFunc = targetFunc 

			parse: () ->
				@program = esprima.parse  "var targetFunc = " + @targetFunc.toString()
				statements = @program.body[0].declarations[0].init.body.body 
				@literals = []
				#for stmt, i in statements when stmt.type == "ExpressionStatement" && stmt.expression.type == "Literal" && typeof stmt.expression.value == "string")
				for stmt in statements
					if stmt.type == "ExpressionStatement" && stmt.expression.type == "Literal" && typeof stmt.expression.value == "string"
						@literals.push stmt
					else
						break
						

				return @literals

		class Annotation
			constructor: () ->

		jSanno

)())
# (() ->
# 	# this.jSanno = (typeof module != "undefined"? module: {}).exports = 
# 	return define("esprima", factory) if typeof define == "function"
# 	return (module.exports = jSannoFactory(require("esprima"))) if typeof require == "function" && typeof module != "undefined"
# 	return (this.jSanno = jSannoFactory(this.esprima)) if this.window == this

	
# )()
