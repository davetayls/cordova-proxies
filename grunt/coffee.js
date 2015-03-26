module.exports = {
  options: {
    bare: true
  },
  dist: {
    files: [
      {
        expand: true,
        cwd: 'src',
        src: '**/*.coffee',
        dest: 'amd',
        ext: '.js'
      }
    ]
  }
}
