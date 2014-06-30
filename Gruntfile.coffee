
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
            optimize: 'none'
            allowSourceOverwrites: true
            findNestedDependencies: true

            paths:
              underscore: '../bower_components/underscore/underscore'
              backbone: '../bower_components/backbone/backbone'
              jquery: '../bower_components/jquery/dist/jquery'

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
          dest: 'cordova_proxies.js'

  grunt.registerTask 'default', ['coffee', 'amdwrap']
