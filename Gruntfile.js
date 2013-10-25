module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ember_handlebars: {
      compile: {
        options: {
          processName: function(filename) {
              var fromComponent = filename.substring(filename.lastIndexOf('/components/')+1,filename.length);
              return fromComponent.substring(0,fromComponent.length-4);
          },
          namespace: "Ember.TEMPLATES"
        },
        files: {
          ".tmp/emberui-components.js": [
            "app/templates/**/*.hbs"
          ]
        }
      }
    },
    sass : {
      dist: {
        options: {
          style: 'nested',
          compass: true
        },
        files: {
          'build/emberui.css': 'app/styles/emberui/*.scss',
          'build/emberui-default-theme.css': 'app/styles/default-theme/*.scss'
        }
      }
    },
    uglify: {
      options: {
        beautify: true,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd h:M:s") %> */\n'
      },
      build: {
        src:  ['app/init.js','app/**/*.js','app/register.js','.tmp/*.js'], //<%= pkg.name %>
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    clean: ['.tmp'],
    watch: {
      scripts: {
        files: 'app/**',
        tasks: ['default']
      }
    }
  });

  // Load the plugins that provides the tasks above:
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ember-handlebars');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task(s). (The one that is ran when 'grunt' command is called from the directory)
  grunt.registerTask('default', ['ember_handlebars', 'uglify', 'sass', 'clean' ]);
};
