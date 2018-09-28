const { findStorage } = require('browser/lib/findStorage')
const resolveStorageData = require('./resolveStorageData')
const path = require('path')
const exec = require('child_process').exec

function initRepo (storageKey) {

  let targetStorage
  try {
    targetStorage = findStorage(storageKey)
  } catch (e) {
    return Promise.reject(e)
  }

  return resolveStorageData(targetStorage)
    .then((storage) => {

      process.chdir(path.resolve(storage.path))

      exec(`git init`, (data, az) => {
        console.log('GA =>', data)
        console.log('GA =>', az)
      })
    })
}

module.exports = initRepo
