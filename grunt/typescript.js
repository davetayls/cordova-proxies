
module.exports = {
  options: {
    module: 'commonjs',
    target: 'es5',
    sourceMap: true,
    declaration: false,
    noImplicitAny: true
  },
  src: {
    src: ['src/**/*.ts'],
    dest: ''
  },
  test: {
    src: ['test/**/*.ts'],
    dest: ''
  }
};
