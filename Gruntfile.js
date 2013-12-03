module.exports = function(grunt){
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		coffee: {
		   compileWithMaps: {
		    options: {
		      sourceMap: true
		    },
		    files: {
		      'build/jsanno.js': ['./jsanno.coffee'] ,// concat then compile into single file
		      'build/test/test.js': ['./test/test.coffee'], // concat then compile into single file
		     
		    }
		  }
		},
		karma: {
		  unit: {
		    configFile: 'karma.conf.js',
		    // singleRun: true
		  }
		},
		copy:{
			dependencies:{
				files:[
					{src: ['node_modules/esprima/esprima.js'], dest: 'build/esprima.js', filter: 'isFile'}, // esprima - the js code parser
					{src: ['node_modules/interceptor.js/interceptor.js'], dest: 'build/interceptor.js', filter: 'isFile'}, // interceptor.js - the js function interceptor
				]
			},
			testfiles:{
				files:[
					{src: "test/jstest.js", dest: "build/"},
					//{src: "node_modules/nunit/nunit-browser.js", dest: "build/test/nunit-browser.js"},
				]
			}
		},
		clean: ["build/"],
		watch:{
			files:[
				"./*.js",
				"./*.coffee",
				"test/*.*"
			],
			tasks:["build"]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['build']);
	grunt.registerTask('build', ['coffee', 'copy']);
	//grunt.registerTask('clean-build', ["clean"]);
	grunt.registerTask('test', ['build', 'karma']);
}
