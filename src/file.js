define(function (require, exports, module) {/// <reference path="../typings/tsd.d.ts" />
var _ = require('underscore');
function syncLocal(name, url, opts, cb) {
    console.log('file#syncLocal', name, url);
    _.defaults(opts, {
        storageType: window.PERSISTENT
    });
    window.requestFileSystem(opts.storageType, 0, function (fileSystem) {
        var _flags = {
            create: true,
            exclusive: false
        };
        fileSystem.root.getFile(name, _flags, function (fileEntry) {
            fileEntry.file(function (file) {
                if (file.size > 1) {
                    cb(null, fileEntry.toURL());
                }
                else {
                    var localPath = fileEntry.toURL();
                    var fileTransfer = new FileTransfer();
                    var _success = function (entry) {
                        console.log('transfer success');
                        cb(null, localPath);
                    };
                    var _fail = function (error) {
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
exports.syncLocal = syncLocal;
function createFileFromDataUrl(fs, fileName, dataUrl, successHandler, errorHandler) {
    fs.root.getFile(fileName, { create: true }, function (fileEntry) {
        // Create a FileWriter object for our FileEntry
        fileEntry.createWriter(function (fileWriter) {
            fileWriter.onwriteend = function (e) {
                console.log('Write completed.');
                successHandler(fileEntry.toURL());
            };
            fileWriter.onerror = function (e) {
                console.log('Write failed: ' + e.toString());
                errorHandler(e);
            };
            // Create a new Blob and write it to log.txt.
            var blob = dataURLToBlob(dataUrl);
            fileWriter.write(blob);
        }, errorHandler);
    }, errorHandler);
}
exports.createFileFromDataUrl = createFileFromDataUrl;
/**
 * Creates and returns a blob from a data URL (either base64 encoded or not).
 *
 * @param {string} dataURL The data URL to convert.
 * @return {Blob} A blob representing the array buffer data.
 */
function dataURLToBlob(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], { type: contentType });
    }
    else {
        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;
        var uInt8Array = new Uint8Array(rawLength);
        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], { type: contentType });
    }
}
exports.dataURLToBlob = dataURLToBlob;

});
