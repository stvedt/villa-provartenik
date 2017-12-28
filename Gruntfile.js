module.exports = function(grunt) {

  var sourceDirectory = "app/",
      destinationDirectory = "build/";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: {
        src: [ destinationDirectory ]
      }
    },

    uglify: {
      options: {
        mangle: true
      },
      my_target: {
        files: [{
          expand: true,
          cwd: destinationDirectory + 'js',
          src: '**/*.js',
          dest: destinationDirectory + 'js',
          compress: true
        }]
      }
    },
    watch: {
      files: {
        files: sourceDirectory + '**/*.*',
        tasks: ['build']
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: destinationDirectory + 'css',
        src: ['**/*.css'],
        dest: destinationDirectory + 'css',
        ext: '.min.css'
      }
    },

    includes: {
      files: {
        src: '*.html',
        dest: destinationDirectory,
        flatten: true,
        cwd: sourceDirectory,
        options: {
          silent: true,
          banner: '<!-- I am a banner <% includes.files.dest %> -->'
        }
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, cwd: sourceDirectory + 'assets', src: ['**'], dest: destinationDirectory + 'assets'}

        ]
      }
    },

  });

  // - - - - - - - - -  - - - - - - - - -  - - - - - - - - -

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-includes');

  // - - - - - - - - -  - - - - - - - - -  - - - - - - - - -


  grunt.registerTask('default', ['clean','copy:main','includes'] );



  // - - - - - - - - -  - - - - - - - - -  - - - - - - - - -

}