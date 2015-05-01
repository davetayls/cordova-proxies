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

});
