module.exports = {
  options: {
    files: ['package.json', 'bower.json'],
    commit: true,
    commitFiles: ['.'],
    createTag: true,
    tagName: 'v%VERSION%',
    push: true,
    pushTo: 'origin'
  }
};

