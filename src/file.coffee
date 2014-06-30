'use strict'

_ = require 'underscore'

# Ensure we have a copy of a file locally and then
# resolve with its local url
exports.syncLocal = (name, url, opts = {}, cb) ->
  console.log 'file#syncLocal', name, url
  _.defaults opts,
    storageType: LocalFileSystem.PERSISTENT

  window.requestFileSystem(opts.storageType, 0, (fileSystem) =>
    _flags =
      create: true
      exclusive: false

    fileSystem.root.getFile(name, _flags, (fileEntry) =>
      fileEntry.file (file)->
        if file.size > 1
          cb(null, fileEntry.toURL())
        else
          localPath = fileEntry.toURL()
          #          if device.platform is "Android" and localPath.indexOf("file://") is 0
          #            localPath = localPath.substring(7);
          fileTransfer = new window.FileTransfer()

          _success = (entry) =>
            console.log 'transfer success'
            cb(null, localPath)

          _fail = (error) =>
            console.log '#syncLocal transfer fail', error
            cb(error)

          console.log '#syncLocal transfer', url, localPath
          fileTransfer.download(encodeURI(url), localPath, _success, _fail)
    )
  )
  return
