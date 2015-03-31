/// <reference path="../typings/tsd.d.ts" />

import _ = require('underscore');

export function syncLocal(name:string, url:string, opts:any, cb:(err:FileTransferError, url?:string) => void) {
  console.log('file#syncLocal', name, url);
  _.defaults(opts, {
    storageType: window.PERSISTENT
  });
  window.requestFileSystem(opts.storageType, 0, (fileSystem) => {
    var _flags = {
      create: true,
      exclusive: false
    };
    fileSystem.root.getFile(name, _flags, (fileEntry) => {
      fileEntry.file(function (file) {
        if (file.size > 1) {
          cb(null, fileEntry.toURL());
        } else {
          var localPath = fileEntry.toURL();
          var fileTransfer = new FileTransfer();
          var _success = (entry:FileEntry) => {
            console.log('transfer success');
            cb(null, localPath);
          };
          var _fail = (error:FileTransferError) => {
            console.log('#syncLocal transfer fail', error);
            cb(error);
          };
          console.log('#syncLocal transfer', url, localPath);
          fileTransfer.download(encodeURI(url), localPath, _success, _fail);
        }
      });
    });
  });

}

