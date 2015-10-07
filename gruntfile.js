module.exports = function(grunt) {

  // setup configuration options
  grunt.initConfig({

    // expose current npm package list
    pkg: grunt.file.readJSON('package.json'),

    // check Javascript code for possible issues
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: ['gruntfile.js', 'client/js/**/*.js', 'server/**/*.js']
      }
    },

    // build Angular code to connect to loopback-generated data access API
    loopback_sdk_angular: {
      services: {
        options: {
          input: 'server/server.js',
          output: 'client/js/services/lb-services.js'
        }
      }
    },

    // generate LoopBack/Angular documentation
    docularserver:{
      targetDir: "docular_generated"
    },
    docular: {
      showDocularDocs: true,
      showAngularDocs: true,
      groups: [{
        groupTitle: 'MailEXEC',
        groupId: 'MailEXEC',
        sections: [{
          id: 'lbServices',
          title: 'LoopBack Services',
          scripts: ['client/js/services/lb-services.js']
        }]
      }]
    }
  });

  // load additional modules/plugins
  grunt.loadNpmTasks('grunt-continue'); // force continue (--force) after warnings
  grunt.loadNpmTasks('grunt-loopback-sdk-angular');
  grunt.loadNpmTasks('grunt-docular');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // define tasks
  grunt.registerTask('default', ['continue:on','jshint', 'loopback_sdk_angular', 'docular']);
};
