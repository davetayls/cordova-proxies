
module.exports = {
  options: {
    module: 'commonjs',
    target: 'es5',
    sourceMap: false,
    declaration: true,
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
