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
      fileEntry.file(function(file) {
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

export function createFileFromDataUrl(fs:FileSystem,
                                      fileName:string,
                                      dataUrl:string,
                                      successHandler:(fileSystemUrl:string)=>void,
                                      errorHandler:(error:any)=>void):void {

  fs.root.getFile(fileName, {create: true}, function(fileEntry) {

    // Create a FileWriter object for our FileEntry
    fileEntry.createWriter(function(fileWriter) {

      fileWriter.onwriteend = function(e:ProgressEvent) {
        console.log('Write completed.');
        successHandler(fileEntry.toURL());
      };

      fileWriter.onerror = function(e:ProgressEvent) {
        console.log('Write failed: ' + e.toString());
        errorHandler(e);
      };

      // Create a new Blob and write it to log.txt.
      var blob:Blob = dataURLToBlob(dataUrl);

      fileWriter.write(blob);

    }, errorHandler);

  }, errorHandler);
}

/**
 * Creates and returns a blob from a data URL (either base64 encoded or not).
 *
 * @param {string} dataURL The data URL to convert.
 * @return {Blob} A blob representing the array buffer data.
 */
export function dataURLToBlob(dataURL:string):Blob {
  var BASE64_MARKER = ';base64,';
  if (dataURL.indexOf(BASE64_MARKER) == -1) {
    var parts = dataURL.split(',');
    var contentType = parts[0].split(':')[1];
    var raw = decodeURIComponent(parts[1]);
    return new Blob([raw], {type: contentType});
  } else {
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
  }

}

