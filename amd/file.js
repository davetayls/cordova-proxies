define(function (require, exports, module) {'use strict';
var Q, _;

Q = require('q');

_ = require('underscore');

exports.syncLocal = function(name, url, opts) {
  var d;
  if (opts == null) {
    opts = {};
  }
  d = Q.defer();
  console.log('file#syncLocal', name, url);
  _.defaults(opts, {
    storageType: LocalFileSystem.PERSISTENT
  });
  window.requestFileSystem(opts.storageType, 0, (function(_this) {
    return function(fileSystem) {
      var _flags;
      _flags = {
        create: true,
        exclusive: false
      };
      return fileSystem.root.getFile(name, _flags, function(fileEntry) {
        return fileEntry.file(function(file) {
          var fileTransfer, localPath, _fail, _success;
          if (file.size > 1) {
            return d.resolve(fileEntry.toURL());
          } else {
            localPath = fileEntry.toURL();
            fileTransfer = new window.FileTransfer();
            _success = (function(_this) {
              return function(entry) {
                console.log('transfer success');
                return d.resolve(localPath);
              };
            })(this);
            _fail = (function(_this) {
              return function(error) {
                console.log('#syncLocal transfer fail', error);
                return d.reject(error);
              };
            })(this);
            console.log('#syncLocal transfer', url, localPath);
            return fileTransfer.download(encodeURI(url), localPath, _success, _fail);
          }
        });
      });
    };
  })(this));
  return d.promise;
};

});
