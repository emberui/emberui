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
          ".tmp/hello-world-components.js": [
            "app/templates/components/hello-world.hbs"
          ]
        }
      }
    },
    sass : {
      dist: {
        options: {
          style: 'nested'
        },
        files: {
          'build/emberui.css': 'app/styles/emberui/*.scss',
          'build/emberui-default-theme.css': 'app/styles/default-theme/*.scss'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd h:M:s") %> */\n'
      },
      build: {
        src:  ['app/init.js','app/**/*.js', '.tmp/*.js'], //<%= pkg.name %>
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    clean: ['.tmp'],
    watch: {
      scripts: {
        files: 'app/scripts/**/*.js',
        tasks: ['ember_handlebars']
      }
    }
  });

  // Load the plugins that provides the tasks above:
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ember-handlebars');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s). (The one that is ran when 'grunt' command is called from the directory)
  grunt.registerTask('default', ['ember_handlebars', 'uglify', 'clean', 'sass' ]);
};
