module.exports = function(grunt) {
grunt.initConfig({
pkg: grunt.file.readJSON('package.json'),
  uglify: {
	  options: {
		  manage:false
	  },
  my_target: {
	  files: {
		  'js/latests.min.js':['js/validations.js','js/input3.js']
	  }
  }
   
    },
  /* },
      jshint: {
    all: ['public/*.js']
  }, */
/* uglify:{
	
    my_target: {
      files: {
		  src: 'public/js/*.js'
		  dest: 'public/img/'
		  expand: true,
		  flatten: true,
		  
		 
      }
    }
  }, 
   */
/*   });
   
	

grunt.initConfig({
  uglify: {
    my_target: {
      files: {
        'dest/output.min.js': ['public\js\function.js', 'public\js\tree.js']
      }
    }
  }
});


grunt.initConfig({
  concat: {
    // concat task configuration goes here.
  },
  uglify: {
    // uglify task configuration goes here.
  },
  // Arbitrary non-task-specific properties.
  my_property: 'whatever',
  my_src_files: ['js/*.js', 'img/*.js'],
}); */ 
});
/* grunt.loadNpmTasks('grunt-contrib-watch'); */
	grunt.loadNpmTasks('grunt-contrib-uglify');
	/* grunt.loadNpmTasks('grunt-contrib-jshint'); */

};