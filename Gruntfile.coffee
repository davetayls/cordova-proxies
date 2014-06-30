
module.exports = (grunt) ->

  require('load-grunt-config') grunt,
    config:
      amdwrap:
        dist:
          expand: true
          cwd: 'amd'
          src: [
            '**/*.js'
          ]
          dest: 'amd'

      coffee:
        options:
          bare: true

        dist:
          files: [
            expand: true
            cwd: 'src'
            src: '**/*.coffee'
            dest: 'amd'
            ext: '.js'
          ]

      requirejs:
        dist:
          options:
            appDir: 'amd'
            baseUrl: './'
            dir: 'tmp'
            allowSourceOverwrites: true
            findNestedDependencies: true

            paths:
              underscore: '../bower_components/underscore/underscore'
              backbone: '../bower_components/backbone/backbone'
              jquery: '../bower_components/jquery/dist/jquery'
              q: '../bower_components/q/q'

            modules: [
              name: 'index'
              exclude: [
                'underscore'
                'backbone'
                'jquery'
                'q'
              ]
            ]

      copy:
        dist:
          src: 'tmp/index.js'
          dest: 'cordova-proxies.js'

  grunt.registerTask 'default', ['coffee', 'amdwrap', 'requirejs', 'copy']