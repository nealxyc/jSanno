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
		      'build/test/test.js': ['./test/test.coffee'] // concat then compile into single file
		    }
		  }
		},
		karma: {
		  unit: {
		    configFile: 'karma.conf.js',
		    //singleRun: true
		  }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-karma');

	// Default task(s).
	grunt.registerTask('default', ['coffee']);
	grunt.registerTask('test', ['coffee', 'karma']);
}
