
module.exports = function (grunt){

  require('load-grunt-config')(grunt);

  grunt.registerTask('build', [
    'typescript',
    'dts_bundle',
    'amdwrap'
  ]);

  grunt.registerTask('release', function (release){
    release = release || 'patch';
    grunt.task.run([
      "bump-only:#{release}",
      'build',
      "bump-commit"
    ]);
  });

};
