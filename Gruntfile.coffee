
module.exports = (grunt) ->

  require('load-grunt-config')(grunt)

  grunt.registerTask 'build', [
    'typescript',
    'amdwrap'
  ]

  grunt.registerTask 'release', (release = 'patch') ->
    grunt.task.run [
      "bump-only:#{release}"
      'build'
      "bump-commit"
    ]
