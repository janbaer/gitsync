module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        'bitwise': true,
        'camelcase': true,
        'curly': true,
        'eqeqeq': true,
        'es5': true,
        'forin': true,
        'globalstrict': true,
        'immed': true,
        'indent': 2,
        'latedef': true,
        'newcap': true,
        'noarg': true,
        'node': true,
        'noempty': true,
        'nonew': true,
        'plusplus': false,
        'quotmark': 'single',
        'regexp': true,
        'strict': true,
        'trailing': true,
        'undef': true,
        'unused': true,
        'asi': true
      },
      files: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js']
    },
    watch: {
      jshint: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'watch']);

};